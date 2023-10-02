import {
  CreateUserRoleDto,
  FindCompositeKeyUserRoleDto,
  UpdateUserRoleDto,
} from '../../core/dtos/userRoleDto';

export const mockUserRoles = {
  userId: '556dbf8e-5c8d-4a28-9da0-6a2916b8f193',
  roleId: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
  assignedAt: '2023-09-25T03:35:02.439Z',
  user: {
    id: '556dbf8e-5c8d-4a28-9da0-6a2916b8f193',
    email: 'hanhnguyen.job@gmail.com',
    isPending: true,
    isDisable: false,
    createdAt: '2023-09-25T03:35:02.416Z',
    updatedAt: '2023-09-25T03:35:02.416Z',
    updatedBy: null,
    firstName: 'Hanh Nguyen',
    lastName: null,
    globalId: null,
    officeCode: null,
    country: null,
    password: '$2b$10$GAJmQjOB74pOx9B8KsDdS.94i29DAnW./OVxadsI5ESiRYtxbO8ci',
    isRegisteredWithGoogle: true,
  },
  role: {
    id: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
    name: 'user',
    createdAt: '2023-09-20T16:43:34.228Z',
    updatedAt: '2023-09-20T16:43:34.228Z',
    createdBy: '69d139fc-4762-42e6-92e9-1c9841c5a619',
    updatedBy: null,
    description: 'User',
  },
};
export const mockUserRolesAll = {
  data: [mockUserRoles],
  total: 1,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
};
export const createUserRolesDto = {
  userId: '556dbf8e-5c8d-4a28-9da0-6a2916b8f193',
  roleId: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
} as CreateUserRoleDto;
export const updateUserRoles = {
  params: {
    user_id: '556dbf8e-5c8d-4a28-9da0-6a2916b8f193',
    role_id: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
  } as FindCompositeKeyUserRoleDto,
  updatedDto: {
    userId: '556dbf8e-5c8d-4a28-9da0-6a2916b8f193',
    roleId: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
  } as UpdateUserRoleDto,
};
