import { IPermissionModel } from '../../presentation/models';

export const mockPermissions = {
  id: '061902ce-be41-4008-9b22-cbef121156c7',
  name: 'view-menu: user-management-main',
  createdAt: '2023-09-21T02:05:37.326Z',
  description: '',
  updatedAt: '2023-09-21T02:05:37.326Z',
  code: '',
  permissionGroupId: '32d888c2-186c-4f35-838e-3dad76739de8',
  rolePermissions: [
    {
      roleId: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
      permissionId: '061902ce-be41-4008-9b22-cbef121156c7',
    },
    {
      roleId: 'f234efdc-e590-41e4-a190-04c651ab49d9',
      permissionId: '061902ce-be41-4008-9b22-cbef121156c7',
    },
    {
      roleId: '79f8fb19-e607-4014-8e96-0b7edf3d727d',
      permissionId: '061902ce-be41-4008-9b22-cbef121156c7',
    },
    {
      roleId: '534442c7-27eb-44f4-96da-90a6b523c60b',
      permissionId: '061902ce-be41-4008-9b22-cbef121156c7',
    },
  ],
  permissionGroup: {
    id: '32d888c2-186c-4f35-838e-3dad76739de8',
    name: 'view menu',
    createdAt: '2023-09-20T16:39:14.897Z',
    updatedAt: '2023-09-21T01:39:32.031Z',
  },
};
export const mockPermissionsAll = {
  data: [mockPermissions],
  total: 1,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
};
export const createPermissionsDto = {
  name: 'view-menu: user-management-main',
  description: '123',
  code: '321',
  permissionGroupId: '32d888c2-186c-4f35-838e-3dad76739de8',
} as IPermissionModel;
export const updatePermissions = {
  id: '061902ce-be41-4008-9b22-cbef121156c7',
  updatedPermissionsDto: {
    name: 'view-menu: user-management-main',
    description: '123',
    code: '321',
    permissionGroupId: '32d888c2-186c-4f35-838e-3dad76739de8',
  } as IPermissionModel,
};
