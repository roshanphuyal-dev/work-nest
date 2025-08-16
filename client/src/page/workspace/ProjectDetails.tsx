import { Separator } from "@/components/ui/separator";
import ProjectAnalytics from "@/components/workspace/project/project-analytics";
import ProjectHeader from "@/components/workspace/project/project-header";
import TaskTable from "@/components/workspace/task/task-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import KanbanView from "../../components/workspace/task/Tasks-Kanban";

const ProjectDetails = () => {
  return (
    <div className="w-full space-y-6 py-4 md:pt-3">
      <ProjectHeader />
      <div className="space-y-5">
        <ProjectAnalytics />
        <Separator />
        <div>
          <Tabs defaultValue="table-view" className="w-auto">
            <TabsList>
              <TabsTrigger value="table-view">Table View</TabsTrigger>
              {/* <TabsTrigger value="kanban-view">Kanban View</TabsTrigger> */}
            </TabsList>
            <TabsContent value="table-view">
              <div>
                <TaskTable />
              </div>
            </TabsContent>
            {/* <TabsContent value="kanban-view">
              <KanbanView />
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
