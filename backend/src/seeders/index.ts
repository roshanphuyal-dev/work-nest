// @ts-nocheck
import "dotenv/config";
import mongoose, { ClientSession } from "mongoose";
import { faker } from "@faker-js/faker";
import UserModel, { UserDocument } from "../models/user.model";
import WorkspaceModel, { WorkspaceDocument } from "../models/workspace.model";
import ProjectModel, { ProjectDocument } from "../models/project.model";
import TaskModel, { TaskDocument } from "../models/task.model";
import RoleModel, { RoleDocument } from "../models/roles-permission.model";
import AccountModel, { AccountDocument } from "../models/account.model";
import MemberModel, { MemberDocument } from "../models/member.model";
import { Roles } from "../enums/role.enum";
import { RolePermissions } from "../utils/role-permission";
import { hashValue } from "../utils/bcrypt";
import { SkillLevel } from "../enums/skill-level.enums";
import { SkillCategory } from "../enums/skill-category.enums";
import { ProviderEnum } from "../enums/account-provider.enum";
import { generateInviteCode, generateTaskCode } from "../utils/uuid";
import { TaskPriorityEnum, TaskStatusEnum } from "../enums/task.enum";
import connectDatabase from "../config/database.config";
import { writeFile } from "fs/promises";
import path from "path";

const USER_COUNT = 50;
const WORKSPACE_COUNT = 10;
const PROJECTS_PER_WORKSPACE = { min: 2, max: 5 };
const MEMBERS_PER_WORKSPACE = { min: 10, max: 20 };
const TASKS_PER_PROJECT = { min: 7, max: 20 };
const PASSWORD = "password123";

async function seedRoles(session: ClientSession) {
  return RoleModel.insertMany(
    [
      { name: Roles.ADMIN, permissions: RolePermissions[Roles.ADMIN] },
      { name: Roles.OWNER, permissions: RolePermissions[Roles.OWNER] },
      { name: Roles.MEMBER, permissions: RolePermissions[Roles.MEMBER] },
    ],
    { session }
  );
}

async function seedUsers(session: ClientSession) {
  const users: UserDocument[] = [];
  const usedEmails = new Set<string>();

  // Simple pool of realistic skills to seed user profiles
  const SKILL_POOL: string[] = [
    // Frontend
    "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Next.js",
    // Backend
    "Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL",
    // DevOps
    "Docker", "Kubernetes", "CI/CD", "Terraform",
    // QA
    "Jest", "Cypress", "Playwright",
    // Design
    "Figma", "UI/UX",
    // Data
    "Python", "Pandas", "Data Visualization",
  ];

  for (let i = 0; i < USER_COUNT; i++) {
    let email = faker.internet.email().toLowerCase();
    while (usedEmails.has(email)) {
      email = faker.internet.email().toLowerCase();
    }
    usedEmails.add(email);

    // Randomize primary categories (1-3 unique)
    const allCategories = Object.values(SkillCategory);
    const categoryCount = faker.number.int({ min: 1, max: 3 });
    const primarySkillCategories = faker.helpers.arrayElements(
      allCategories,
      categoryCount
    );

    // Randomize user skills (3-8 unique)
    const skillsCount = faker.number.int({ min: 3, max: 8 });
    const userSkills = faker.helpers.arrayElements(SKILL_POOL, skillsCount);

    const user = new UserModel({
      name: faker.person.fullName(),
      email,
      password: await hashValue(PASSWORD),
      skillLevel: faker.helpers.arrayElement(Object.values(SkillLevel)),
      profilePicture: faker.image.avatar(),
      isActive: true,
      lastLogin: null,
      currentWorkspace: null,
      primarySkillCategories,
      userSkills,
    });

    await user.save({ session });
    users.push(user);
  }

  const plainUsers = users.map((u) => u.toObject());
  const filePath = path.join(process.cwd(), "seeded-users.json");
  await writeFile(filePath, JSON.stringify(plainUsers, null, 2), "utf-8").catch(
    console.error
  );
  console.log(`✅ Seeded ${users.length} users and saved to ${filePath}`);
  return users;
}

async function seedAccounts(users: UserDocument[], session: ClientSession) {
  const accounts: AccountDocument[] = [];
  for (const user of users) {
    const account = new AccountModel({
      userId: user._id,
      provider: ProviderEnum.EMAIL,
      providerId: user.email,
      refreshToken: null,
      tokenExpiry: null,
    });
    await account.save({ session });
    accounts.push(account);
  }
  return accounts;
}

async function seedWorkspaces(
  users: UserDocument[],
  session: ClientSession
): Promise<WorkspaceDocument[]> {
  const workspaces: WorkspaceDocument[] = [];
  const usedInviteCodes = new Set<string>();

  for (let i = 0; i < WORKSPACE_COUNT; i++) {
    const owner = users[i % users.length];
    let inviteCode = generateInviteCode();
    while (usedInviteCodes.has(inviteCode)) {
      inviteCode = generateInviteCode();
    }
    usedInviteCodes.add(inviteCode);

    const workspace = new WorkspaceModel({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      owner: owner._id,
      inviteCode,
    });

    await workspace.save({ session });
    workspaces.push(workspace);

    // update user's currentWorkspace
    await UserModel.updateOne(
      { _id: owner._id },
      { currentWorkspace: workspace._id },
      { session }
    );
  }
  return workspaces;
}

async function seedMembers(
  workspaces: WorkspaceDocument[],
  users: UserDocument[],
  roles: RoleDocument[],
  session: ClientSession
) {
  const members: MemberDocument[] = [];
  for (const workspace of workspaces) {
    // Owner
    const ownerMember = new MemberModel({
      userId: workspace.owner,
      workspaceId: workspace._id,
      role: roles.find((r) => r.name === Roles.OWNER)!._id,
      joinedAt: new Date(),
    });
    await ownerMember.save({ session });
    members.push(ownerMember);

    // Random members
    const additionalMembers = faker.number.int(MEMBERS_PER_WORKSPACE);
    const otherUsers = users.filter(
      (u) => u._id.toString() !== workspace.owner.toString()
    );
    const selectedUsers = faker.helpers.arrayElements(
      otherUsers,
      additionalMembers
    );

    for (const user of selectedUsers) {
      const member = new MemberModel({
        userId: user._id,
        workspaceId: workspace._id,
        role: roles.find((r) => r.name === Roles.MEMBER)!._id,
        joinedAt: new Date(),
      });
      await member.save({ session });
      members.push(member);
    }
  }
  return members;
}

async function seedProjects(
  workspaces: WorkspaceDocument[],
  session: ClientSession
) {
  const projects: ProjectDocument[] = [];
  for (const workspace of workspaces) {
    const projectCount = faker.number.int(PROJECTS_PER_WORKSPACE);
    for (let i = 0; i < projectCount; i++) {
      const project = new ProjectModel({
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        emoji: faker.helpers.arrayElement(["📊", "🚀", "📈", "🛠️"]),
        workspace: workspace._id,
        createdBy: workspace.owner,
        state: faker.helpers.arrayElement(["active", "completed"]),
      });
      await project.save({ session });
      projects.push(project);
    }
  }
  return projects;
}

async function seedTasks(
  projects: ProjectDocument[],
  workspaces: WorkspaceDocument[],
  members: MemberDocument[],
  session: ClientSession
) {
  const tasks: TaskDocument[] = [];
  const usedTaskCodes = new Set<string>();

  for (const project of projects) {
    const taskCount = faker.number.int(TASKS_PER_PROJECT);
    const workspace = workspaces.find(
      (w) => w._id.toString() === project.workspace.toString()
    )!;
    const workspaceMembers = members.filter(
      (m) => m.workspaceId.toString() === workspace._id.toString()
    );

    for (let i = 0; i < taskCount; i++) {
      let taskCode = generateTaskCode();
      while (usedTaskCodes.has(taskCode)) {
        taskCode = generateTaskCode();
      }
      usedTaskCodes.add(taskCode);

      let status = faker.helpers.arrayElement(Object.values(TaskStatusEnum));
      let assignedTo = null;

      // Pick member only if workspace has members
      if (workspaceMembers.length > 0) {
        if (status === TaskStatusEnum.TODO) {
          // TODO can be unassigned OR assigned
          assignedTo = faker.helpers.arrayElement([
            ...workspaceMembers.map((m) => m.userId),
            null,
          ]);
        } else {
          // IN_PROGRESS, DONE, BLOCKED must have an assignee
          assignedTo = faker.helpers.arrayElement(
            workspaceMembers.map((m) => m.userId)
          );
        }
      } else {
        // If no members, force status to TODO and unassigned
        status = TaskStatusEnum.TODO;
        assignedTo = null;
      }

      const task = new TaskModel({
        taskCode,
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        project: project._id,
        workspace: project.workspace,
        status,
        priority: faker.helpers.arrayElement(Object.values(TaskPriorityEnum)),
        assignedTo,
        createdBy: project.createdBy,
        dueDate: faker.date.soon({ days: 30 }),
      });

      await task.save({ session });
      tasks.push(task);
    }
  }
  return tasks;
}

async function seedDatabase() {
  await connectDatabase();
  console.log("Connected to MongoDB");

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // clear all
    await Promise.all([
      UserModel.deleteMany({}, { session }),
      WorkspaceModel.deleteMany({}, { session }),
      ProjectModel.deleteMany({}, { session }),
      TaskModel.deleteMany({}, { session }),
      RoleModel.deleteMany({}, { session }),
      AccountModel.deleteMany({}, { session }),
      MemberModel.deleteMany({}, { session }),
    ]);

    // seeding steps
    const roles = await seedRoles(session);
    const users = await seedUsers(session);
    await seedAccounts(users, session);
    const workspaces = await seedWorkspaces(users, session);
    const members = await seedMembers(workspaces, users, roles, session);
    const projects = await seedProjects(workspaces, session);
    await seedTasks(projects, workspaces, members, session);

    await session.commitTransaction();
    console.log("Database seeded successfully!");
  } catch (err) {
    await session.abortTransaction();
    console.error("Seeding failed, rolled back:", err);
  } finally {
    session.endSession();
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

seedDatabase();
