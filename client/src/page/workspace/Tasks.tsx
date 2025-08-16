import CreateTaskDialog from "@/components/workspace/task/create-task-dialog";
import TaskTable from "@/components/workspace/task/task-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Example from "../../components/workspace/task/Tasks-Kanban";

export default function Tasks() {
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Tasks</h2>
          <p className="text-muted-foreground">
            Here&apos;s the list of tasks for this workspace!
          </p>
        </div>
        <CreateTaskDialog />
      </div>
      <div>
        <Tabs defaultValue="table-view" className="w-auto">
          <TabsList>
            {/* <TabsTrigger value="table-view">Table View</TabsTrigger> */}
            {/* <TabsTrigger value="kanban-view">Kanban View</TabsTrigger> */}
          </TabsList>
          <TabsContent value="table-view">
            <div>
              <TaskTable />
            </div>
          </TabsContent>
          {/* <TabsContent value="kanban-view">
            <Example />
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}
