import {
  Roles,
  Permissions,
  PermissionType,
  RoleType,
} from "../enums/role.enum";

export const RolePermissions: Record<RoleType, Array<PermissionType>> = {
  OWNER: [
    Permissions.CREATE_WORKSPACE,
    Permissions.EDIT_WORKSPACE,
    Permissions.DELETE_WORKSPACE,
    Permissions.MANAGE_WORKSPACE_SETTINGS,

    Permissions.ADD_MEMBER,
    Permissions.CHANGE_MEMBER_ROLE,
    Permissions.REMOVE_MEMBER,

    Permissions.CREATE_PROJECT,
    Permissions.EDIT_PROJECT,
    Permissions.DELETE_PROJECT,
    Permissions.CHANGE_PROJECT_STATUS,

    Permissions.CREATE_TASK,
    Permissions.EDIT_TASK,
    Permissions.DELETE_TASK,

    Permissions.UPDATE_OWN_PASSWORD,
    Permissions.MANAGE_OWN_SKILLS,
    Permissions.MANAGE_USER_SKILL_LEVEL,
    Permissions.MANAGE_USER_PROFILES,

    Permissions.VIEW_ONLY,
  ],
  ADMIN: [
    Permissions.ADD_MEMBER,

    Permissions.CREATE_PROJECT,
    Permissions.EDIT_PROJECT,
    Permissions.DELETE_PROJECT,
    Permissions.CHANGE_PROJECT_STATUS,

    Permissions.CREATE_TASK,
    Permissions.EDIT_TASK,
    Permissions.DELETE_TASK,

    Permissions.UPDATE_OWN_PASSWORD,
    Permissions.MANAGE_OWN_SKILLS,
    Permissions.MANAGE_USER_SKILL_LEVEL,
    Permissions.MANAGE_USER_PROFILES,

    Permissions.MANAGE_WORKSPACE_SETTINGS,
    Permissions.VIEW_ONLY,
  ],
  MEMBER: [
    Permissions.VIEW_ONLY,
    Permissions.CREATE_TASK,
    Permissions.UPDATE_ASSIGNED_TASKS,
    Permissions.UPDATE_OWN_PASSWORD,
    Permissions.MANAGE_OWN_SKILLS,
  ],
};
