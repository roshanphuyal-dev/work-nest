import { Task, User } from "./types";
import { SkillLevel } from "../enums/skill-level.enums";
import { TaskPriorityEnum } from "../enums/task.enum";

export const users: Array<User> = [
  { id: "1", skillLevel: SkillLevel.BEGINNER },
  { id: "3", skillLevel: SkillLevel.INTERMEDIATE },
  { id: "2", skillLevel: SkillLevel.INTERMEDIATE },
  { id: "4", skillLevel: SkillLevel.ADVANCED },
  { id: "6", skillLevel: SkillLevel.EXPERT },
  { id: "5", skillLevel: SkillLevel.ADVANCED },
  { id: "7", skillLevel: SkillLevel.EXPERT },
];

export const tasks: Array<Task> = [
  {
    dueDate: "2025-10-10",
    priority: TaskPriorityEnum.HIGH,
  },
];
