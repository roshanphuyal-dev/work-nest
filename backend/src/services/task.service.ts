import mongoose from "mongoose";
import {
  TaskPriorityEnum,
  TaskPriorityEnumType,
  TaskStatusEnum,
} from "../enums/task.enum";
import MemberModel from "../models/member.model";
import ProjectModel from "../models/project.model";
import TaskModel from "../models/task.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import { recommendAssignments } from "../algorithm/recommend";
import { SkillType } from "../enums/skill-level.enums";
import UserModel from "../models/user.model";

export async function getRandomUsersBySkill(workspaceId: string) {
  const pipeline = [
    { $match: { workspaceId: new mongoose.Types.ObjectId(workspaceId) } },

    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },

    // Group by skillLevel
    {
      $group: {
        _id: "$user.skillLevel",
        users: { $push: "$user" },
      },
    },

    // Pick one random user from each skillLevel
    {
      $project: {
        _id: 0,
        skillLevel: "$_id",
        user: {
          $arrayElemAt: [
            "$users",
            { $floor: { $multiply: [{ $rand: {} }, { $size: "$users" }] } },
          ],
        },
      },
    },

    // Only keep _id and skillLevel from user
    {
      $project: {
        _id: "$user._id",
        skillLevel: 1,
      },
    },
  ];

  const members = await MemberModel.find({
    workspaceId: new mongoose.Types.ObjectId(workspaceId),
  }).populate("userId", "name email skillLevel");
  console.log("Members:", members);

  const results = await MemberModel.aggregate(pipeline);
  return results.map((result) => ({
    id: result._id as string,
    skillLevel: result.skillLevel as SkillType,
  }));
}

export async function findMatchingUsers(
  workspaceId: string,
  requiredCategories: string[],
  requiredSkills: string[]
) {
  const users = await MemberModel.aggregate([
    {
      $match: {
        workspaceId: new mongoose.Types.ObjectId(workspaceId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $match: {
        $expr: {
          $and: [
            { $setIsSubset: [requiredSkills, "$user.userSkills"] },
            // requiredCategories ⊆ user.primarySkillCategories
            {
              $setIsSubset: [
                requiredCategories,
                "$user.primarySkillCategories",
              ],
            },
          ],
        },
      },
    },
    {
      $replaceRoot: { newRoot: "$user" },
    },
  ]);

  return users.map((user) => ({
    id: user._id.toString(),
    skillLevel: user.skillLevel,
  }));
}

async function getRecommendedAssignee(
  workspaceId: string,
  taskPriority: TaskPriorityEnumType,
  taskDueDate?: string,
  userSkills: string[] = [],
  userSkillCategories: string[] = []
) {
  const users = await findMatchingUsers(
    workspaceId,
    userSkillCategories,
    userSkills
  );
  if (users.length === 0) {
    throw new NotFoundException(
      "No users found with the required skills or categories."
    );
  }

  if (users.length === 1) {
    return users[0].id;
  }

  const recommendedUser = await recommendAssignments(users, {
    dueDate: taskDueDate,
    priority: taskPriority,
  });

  return recommendedUser ? recommendedUser.assignedTo.id : null;
}

export const createTaskService = async (
  workspaceId: string,
  projectId: string,
  userId: string,
  body: {
    title: string;
    description?: string;
    priority: TaskPriorityEnumType;
    status: string;
    assignedTo?: string | null;
    dueDate?: string;
    shouldAssignBySystem: boolean;
    requiredSkillCategories: string[];
    requiredSkills: string[];
  }
) => {
  const { title, description, priority, status, assignedTo, dueDate } = body;
  const project = await ProjectModel.findById(projectId);

  if (!project || project.workspace.toString() !== workspaceId.toString()) {
    throw new NotFoundException(
      "Project not found or does not belong to this workspace"
    );
  }
  if (assignedTo) {
    const isAssignedUserMember = await MemberModel.exists({
      userId: assignedTo,
      workspaceId,
    });

    if (!isAssignedUserMember) {
      throw new Error("Assigned user is not a member of this workspace.");
    }
  }

  const shouldRecommendedAssignee = body.shouldAssignBySystem && !assignedTo;

  const assignedUser = shouldRecommendedAssignee
    ? await getRecommendedAssignee(
        workspaceId,
        priority,
        dueDate,
        body.requiredSkills,
        body.requiredSkillCategories
      )
    : assignedTo;

  const task = new TaskModel({
    ...body,
    title,
    description,
    priority: priority || TaskPriorityEnum.MEDIUM,
    status: status || TaskStatusEnum.TODO,
    assignedTo: assignedUser || null,
    createdBy: userId,
    workspace: workspaceId,
    project: projectId,
    dueDate,
    isAssignedBySystem: shouldRecommendedAssignee && assignedUser != null,
  });

  await task.save();

  return { task };
};

export const updateTaskService = async (
  workspaceId: string,
  projectId: string,
  taskId: string,
  body: {
    title: string;
    description?: string;
    priority: string;
    status: string;
    assignedTo?: string | null;
    dueDate?: string;
  }
) => {
  const project = await ProjectModel.findById(projectId);

  if (!project || project.workspace.toString() !== workspaceId.toString()) {
    throw new NotFoundException(
      "Project not found or does not belong to this workspace"
    );
  }

  const task = await TaskModel.findById(taskId);

  if (!task || task.project.toString() !== projectId.toString()) {
    throw new NotFoundException(
      "Task not found or does not belong to this project"
    );
  }

  const isAssignedBySystem =
    task.isAssignedBySystem &&
    task.assignedTo &&
    body.assignedTo === task.assignedTo.toString();

  const updatedTask = await TaskModel.findByIdAndUpdate(
    taskId,
    {
      ...body,
      isAssignedBySystem,
    },
    { new: true }
  );

  if (!updatedTask) {
    throw new BadRequestException("Failed to update task");
  }

  return { updatedTask };
};

export const getAllTasksService = async (
  workspaceId: string,
  filters: {
    projectId?: string;
    status?: string[];
    priority?: string[];
    assignedTo?: string[];
    keyword?: string;
    dueDate?: string;
  },
  pagination: {
    pageSize: number;
    pageNumber: number;
  }
) => {
  const query: Record<string, any> = {
    workspace: workspaceId,
  };

  if (filters.projectId) {
    query.project = filters.projectId;
  }

  if (filters.status && filters.status?.length > 0) {
    query.status = { $in: filters.status };
  }

  if (filters.priority && filters.priority?.length > 0) {
    query.priority = { $in: filters.priority };
  }

  if (filters.assignedTo && filters.assignedTo?.length > 0) {
    query.assignedTo = { $in: filters.assignedTo };
  }

  if (filters.keyword && filters.keyword !== undefined) {
    query.title = { $regex: filters.keyword, $options: "i" };
  }

  if (filters.dueDate) {
    query.dueDate = {
      $eq: new Date(filters.dueDate),
    };
  }

  //Pagination Setup
  const { pageSize, pageNumber } = pagination;
  const skip = (pageNumber - 1) * pageSize;

  const [tasks, totalCount] = await Promise.all([
    TaskModel.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate("assignedTo", "_id name profilePicture -password")
      .populate("project", "_id emoji name"),
    TaskModel.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    tasks,
    pagination: {
      pageSize,
      pageNumber,
      totalCount,
      totalPages,
      skip,
    },
  };
};

export const getTaskByIdService = async (
  workspaceId: string,
  projectId: string,
  taskId: string
) => {
  const project = await ProjectModel.findById(projectId);

  if (!project || project.workspace.toString() !== workspaceId.toString()) {
    throw new NotFoundException(
      "Project not found or does not belong to this workspace"
    );
  }

  const task = await TaskModel.findOne({
    _id: taskId,
    workspace: workspaceId,
    project: projectId,
  }).populate("assignedTo", "_id name profilePicture -password");

  if (!task) {
    throw new NotFoundException("Task not found.");
  }

  return task;
};

export const deleteTaskService = async (
  workspaceId: string,
  taskId: string
) => {
  const task = await TaskModel.findOneAndDelete({
    _id: taskId,
    workspace: workspaceId,
  });

  if (!task) {
    throw new NotFoundException(
      "Task not found or does not belong to the specified workspace"
    );
  }

  return;
};
