import { SkillLevel } from "../enums/skill-level.enums";
import { TaskPriorityEnum } from "../enums/task.enum";

export const SkillWeights = {
  [SkillLevel.BEGINNER]: 1,
  [SkillLevel.INTERMEDIATE]: 2,
  [SkillLevel.ADVANCED]: 3,
  [SkillLevel.EXPERT]: 4,
} as const;

export const PriorityWeights = {
  [TaskPriorityEnum.LOW]: 1,
  [TaskPriorityEnum.MEDIUM]: 2,
  [TaskPriorityEnum.HIGH]: 3,
} as const;
