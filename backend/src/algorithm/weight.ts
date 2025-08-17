import { SkillLevel } from "../enums/skill-level.enums";
import { TaskPriorityEnum } from "../enums/task.enum";

export const SkillWeights = {
  [SkillLevel.INTERN]: 1,
  [SkillLevel.JUNIOR]: 2,
  [SkillLevel.MID_LEVEL]: 3,
  [SkillLevel.SENIOR]: 4,
} as const;

export const PriorityWeights = {
  [TaskPriorityEnum.LOW]: 1,
  [TaskPriorityEnum.MEDIUM]: 2,
  [TaskPriorityEnum.HIGH]: 3,
} as const;
