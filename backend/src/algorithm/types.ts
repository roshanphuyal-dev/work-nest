import { PriorityWeights, SkillWeights } from "./weight";

export interface Task {
  priority: keyof typeof PriorityWeights;
  dueDate?: string;
}

export interface User {
  id: string;
  skillLevel: keyof typeof SkillWeights;
}
