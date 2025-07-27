"use client";
import type { DragEndEvent } from "@/components/ui/kanban";
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from "@/components/ui/kanban";
import { TaskStatusEnum } from "@/constant";
import useTaskTableFilter from "@/hooks/use-task-table-filter";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { editTaskMutationFn, getAllTasksQueryFn } from "@/lib/api";
import { faker } from "@faker-js/faker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const columns = [
  { id: TaskStatusEnum.TODO, name: TaskStatusEnum.TODO, color: "#6B7280" },
  {
    id: TaskStatusEnum.IN_PROGRESS,
    name: TaskStatusEnum.IN_PROGRESS,
    color: "#F59E0B",
  },
  { id: TaskStatusEnum.DONE, name: TaskStatusEnum.DONE, color: "#10B981" },
];

const users = Array.from({ length: 4 })
  .fill(null)
  .map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  }));

const exampleFeatures = Array.from({ length: 20 })
  .fill(null)
  .map(() => ({
    id: faker.string.uuid(),
    name: capitalize(faker.company.buzzPhrase()),
    startAt: faker.date.past({ years: 0.5, refDate: new Date() }),
    endAt: faker.date.future({ years: 0.5, refDate: new Date() }),
    column: faker.helpers.arrayElement(columns).id,
    owner: faker.helpers.arrayElement(users),
  }));

const KanbanView = () => {
  const [features, setFeatures] = useState([]);
  const param = useParams();
  const projectId = param.projectId as string;

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filters, setFilters] = useTaskTableFilter();
  const workspaceId = useWorkspaceId();

  const { mutate, isPending } = useMutation({
    mutationFn: editTaskMutationFn,
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      "all-tasks",
      workspaceId,
      pageSize,
      pageNumber,
      filters,
      projectId,
    ],
    queryFn: () =>
      getAllTasksQueryFn({
        workspaceId,
        keyword: filters.keyword,
        priority: filters.priority,
        status: filters.status,
        assignedTo: filters.assigneeId,
        pageNumber,
        pageSize,
      }),
    staleTime: 0,
  });

  // const;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const exampleFeatures =
    data?.tasks.map((task) => ({
      id: task._id,
      name: task.title,

      startAt: new Date(task.createdAt || task.dueDate),
      endAt: new Date(task.dueDate),
      column: task.status,
      owner: task.assignedTo,
    })) || [];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const status = columns.find(({ id }) => id === over.id);
    if (!status) {
      return;
    }
    setFeatures(
      features.map((feature) => {
        if (feature.id === active.id) {
          return { ...feature, column: status.id };
        }
        return feature;
      })
    );
  };

  return (
    <KanbanProvider
      columns={columns}
      data={exampleFeatures}
      onDragEnd={handleDragEnd}
    >
      {(column) => (
        <KanbanBoard id={column.id} key={column.id}>
          <KanbanHeader>{column.name}</KanbanHeader>
          <KanbanCards id={column.id}>
            {(feature) => (
              <KanbanCard
                column={column.name}
                id={feature.id}
                key={feature.id}
                name={feature.name}
              />
            )}
          </KanbanCards>
        </KanbanBoard>
      )}
    </KanbanProvider>
  );
};
export default KanbanView;
