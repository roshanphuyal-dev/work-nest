import { Task, User } from "./types";
import { PriorityLevels, SkillLevels } from "./weight";

export const users: Array<User> = [
  { id: "1", name: "Alice", skillLevel: SkillLevels.INTERN },
  { id: "3", name: "Bob", skillLevel: SkillLevels.JUNIOR },
  { id: "2", name: "Jimmy", skillLevel: SkillLevels.JUNIOR },
  { id: "4", name: "Charlie", skillLevel: SkillLevels.MID_LEVEL },
  { id: "6", name: "Diana", skillLevel: SkillLevels.SENIOR },
  { id: "5", name: "Lena", skillLevel: SkillLevels.MID_LEVEL },
  { id: "7", name: "Eve", skillLevel: SkillLevels.SENIOR },
];

export const tasks: Array<Task> = [
  {
    id: "task1",
    title: "Task 1",
    dueDate: "2025-10-10",
    priority: PriorityLevels.HIGH,
  },
];
