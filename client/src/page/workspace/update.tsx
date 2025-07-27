import { DisplayJson } from "@/components/display-json";
import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members";
import useWorkspaceId from "@/hooks/use-workspace-id";

export function UpdateWorkspace() {
  const workspaceId = useWorkspaceId();
  const { data, isPending } = useGetWorkspaceMembers(workspaceId);

  return <DisplayJson data={data?.roles} />;
}
