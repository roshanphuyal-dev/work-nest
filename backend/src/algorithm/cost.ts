import { PriorityWeights, SkillWeights } from "./weight";
import { User, Task } from "./types";

export function calculateCost(user: User, task: Task): number {
  const userSkill = SkillWeights[user.skillLevel];
  const taskPriority = PriorityWeights[task.priority];

  const skillMismatch = Math.max(0, taskPriority - userSkill);

  let deadlinePenalty = 0;
  if (task.dueDate) {
    const daysLeft = Math.ceil(
      (new Date(task.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    deadlinePenalty = daysLeft < 3 ? 2 : 0;
  }

  return skillMismatch * 2 + deadlinePenalty;
}

export function buildCostMatrix(users: User[], tasks: Task[]): number[][] {
  return tasks.map((task) => users.map((user) => calculateCost(user, task)));
}
