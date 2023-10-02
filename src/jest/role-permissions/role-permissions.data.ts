import { CreateRolePermissionDto } from '../../core/dtos/rolePermissionDto/create-role-permission.dto';
import { UpdateRolePermissionDto } from '../../core/dtos/rolePermissionDto/update-role-permission.dto';
import { FindCompositeKeyRolePermissionDto } from '../../core/dtos/rolePermissionDto/find-composite-key-role-permission.dto';

export const mockRolePermissions = {
  roleId: '534442c7-27eb-44f4-96da-90a6b523c60b',
  permissionId: '48e2dd8a-eee3-47e1-abf6-fc3e4d34f169',
  permission: {
    id: '48e2dd8a-eee3-47e1-abf6-fc3e4d34f169',
    name: 'user: update',
    createdAt: '2023-08-29T06:21:52.238Z',
    description: 'Update',
    updatedAt: '2023-08-29T06:21:52.238Z',
    code: '121312323',
    permissionGroupId: 'c36aad09-b715-46c7-9c67-2d5994082b21',
  },
  role: {
    id: '534442c7-27eb-44f4-96da-90a6b523c60b',
    name: 'admin',
    createdAt: '2023-08-27T16:26:00.189Z',
    updatedAt: '2023-08-29T02:30:44.333Z',
    createdBy: '1f966076-ade8-46f0-a07a-8c52f8b27dce',
    updatedBy: '1f966076-ade8-46f0-a07a-8c52f8b27dce',
    description: '12',
  },
};
export const mockRolePermissionsAll = {
  data: [mockRolePermissions],
  total: 1,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
};
export const createRolePermissionsDto = {
  roleId: '534442c7-27eb-44f4-96da-90a6b523c60b',
  permissionId: '48e2dd8a-eee3-47e1-abf6-fc3e4d34f169',
} as CreateRolePermissionDto;
export const updateRolePermissions = {
  params: {
    role_id: '534442c7-27eb-44f4-96da-90a6b523c60b',
    permission_id: '48e2dd8a-eee3-47e1-abf6-fc3e4d34f169',
  } as FindCompositeKeyRolePermissionDto,
  updatedDto: {
    roleId: '534442c7-27eb-44f4-96da-90a6b523c60b',
    permissionId: '48e2dd8a-eee3-47e1-abf6-fc3e4d34f169',
  } as UpdateRolePermissionDto,
};
