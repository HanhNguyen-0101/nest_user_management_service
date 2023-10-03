import {
  CreatePermissionGroupDto,
  UpdatePermissionGroupDto,
} from '../../presentation/view-models/permissionGroup';

export const mockPermissionGroups = {
  id: '32d888c2-186c-4f35-838e-3dad76739de8',
  name: 'view menu',
  createdAt: '2023-09-20T16:39:14.897Z',
  updatedAt: '2023-09-21T01:39:32.031Z',
};
export const mockPermissionGroupsAll = {
  data: [mockPermissionGroups],
  total: 1,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
};
export const createPermissionGroupsDto = {
  name: 'view menu',
} as CreatePermissionGroupDto;
export const updatePermissionGroups = {
  id: '32d888c2-186c-4f35-838e-3dad76739de8',
  updatedPermissionGroupsDto: {
    name: 'view menu',
  } as UpdatePermissionGroupDto,
};
