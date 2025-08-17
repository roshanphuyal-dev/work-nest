import { buildCostMatrix } from "./cost";
import { Hungarian } from "./hungarian";
import { Task, User } from "./types";

export async function recommendAssignments(users: User[], tasks: Task) {
  const costMatrix = buildCostMatrix(users, [tasks]);
  const m = new Hungarian();
  const indices = m.compute(costMatrix);

  return indices.map(([, userIdx]) => ({
    assignedTo: users[userIdx],
  }))[0];
}
