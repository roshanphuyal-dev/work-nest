import { z } from "zod";
import { TaskPriorityEnum, TaskStatusEnum } from "../enums/task.enum";

export const titleSchema = z.string().trim().min(1).max(255);
export const descriptionSchema = z.string().trim().optional();

export const assignedToSchema = z.string().trim().min(1).nullable().optional();

export const prioritySchema = z.enum([
  TaskPriorityEnum.LOW,
  TaskPriorityEnum.MEDIUM,
  TaskPriorityEnum.HIGH,
]);

export const statusSchema = z.enum(
  Object.values(TaskStatusEnum) as [string, ...string[]]
);

export const dueDateSchema = z
  .string()
  .trim()
  .optional()
  .refine(
    (val) => {
      return !val || !isNaN(Date.parse(val));
    },
    {
      message: "Invalid date format. Please provide a valid date string.",
    }
  );

export const taskIdSchema = z.string().trim().min(1);

const MAX_SKILLS = 5; // Maximum number of skills allowed
const MAX_SKILL_CATEGORIES = 3; // Maximum number of skill categories allowed

export const createTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  priority: prioritySchema,
  status: statusSchema,
  assignedTo: assignedToSchema,
  dueDate: dueDateSchema,
  shouldAssignBySystem: z.boolean().optional().default(true),
  requiredSkillCategories: z
    .array(z.string())
    .min(1)
    .max(MAX_SKILL_CATEGORIES, {
      message: `You can select up to ${MAX_SKILL_CATEGORIES} skill categories.`,
    }),
  requiredSkills: z
    .array(z.string().trim())
    .min(1)
    .max(MAX_SKILLS, {
      message: `You can select up to ${MAX_SKILLS} skills.`,
    }),
});

export const updateTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  priority: prioritySchema,
  status: statusSchema,
  assignedTo: assignedToSchema,
  dueDate: dueDateSchema,
});
