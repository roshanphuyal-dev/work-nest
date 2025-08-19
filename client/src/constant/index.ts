export const TaskStatusEnum = {
  BACKLOG: "BACKLOG",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
} as const;

export const TaskPriorityEnum = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;
export type TaskStatusEnumType = keyof typeof TaskStatusEnum;
export type TaskPriorityEnumType = keyof typeof TaskPriorityEnum;

export const Permissions = {
  // Workspace permissions
  CREATE_WORKSPACE: "CREATE_WORKSPACE",
  DELETE_WORKSPACE: "DELETE_WORKSPACE",
  EDIT_WORKSPACE: "EDIT_WORKSPACE",
  MANAGE_WORKSPACE_SETTINGS: "MANAGE_WORKSPACE_SETTINGS",
  
  // Member permissions
  ADD_MEMBER: "ADD_MEMBER",
  CHANGE_MEMBER_ROLE: "CHANGE_MEMBER_ROLE",
  REMOVE_MEMBER: "REMOVE_MEMBER",
  
  // Project permissions
  CREATE_PROJECT: "CREATE_PROJECT",
  EDIT_PROJECT: "EDIT_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  CHANGE_PROJECT_STATUS: "CHANGE_PROJECT_STATUS",
  
  // Task permissions
  CREATE_TASK: "CREATE_TASK",
  EDIT_TASK: "EDIT_TASK",
  DELETE_TASK: "DELETE_TASK",
  
  // User profile permissions
  UPDATE_OWN_PASSWORD: "UPDATE_OWN_PASSWORD",
  MANAGE_OWN_SKILLS: "MANAGE_OWN_SKILLS",
  MANAGE_USER_SKILL_LEVEL: "MANAGE_USER_SKILL_LEVEL",
  MANAGE_USER_PROFILES: "MANAGE_USER_PROFILES",
  
  // General permissions
  VIEW_ONLY: "VIEW_ONLY",
  UPDATE_ASSIGNED_TASKS: "UPDATE_ASSIGNED_TASKS",
} as const;

export type PermissionType = keyof typeof Permissions;
