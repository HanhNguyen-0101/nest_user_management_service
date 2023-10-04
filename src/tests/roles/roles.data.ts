import { CreateRoleDto, UpdateRoleDto } from '../../presentation/models/role';

export const mockRoles = {
  id: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
  name: 'user',
  createdAt: '2023-09-20T16:43:34.228Z',
  updatedAt: '2023-09-20T16:43:34.228Z',
  createdBy: '69d139fc-4762-42e6-92e9-1c9841c5a619',
  updatedBy: null,
  description: 'User',
  updatedByUser: null,
  createdByUser: {
    id: '69d139fc-4762-42e6-92e9-1c9841c5a619',
    email: 'alice.nguyen@yopmail.com',
    isPending: true,
    isDisable: false,
    createdAt: '2023-08-29T06:58:09.054Z',
    updatedAt: '2023-09-15T06:11:29.255Z',
    updatedBy: '69d139fc-4762-42e6-92e9-1c9841c5a619',
    firstName: 'Hanh',
    lastName: 'Nguyen',
    globalId: 'GID_002',
    officeCode: 'OC_002',
    country: 'EN',
    password: '$2b$10$b65nx5y.P5SX0QJZfLsNBuYajHukvMAQF8C.8r3raw7g56Sh4WbIm',
    isRegisteredWithGoogle: false,
  },
  userRoles: [
    {
      userId: '9137ca87-30d3-45e2-bbd3-232cda555ac3',
      roleId: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
      assignedAt: '2023-09-20T16:48:48.836Z',
    },
    {
      userId: '45730fdf-554f-43ec-82cb-bfabb739ad60',
      roleId: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
      assignedAt: '2023-09-21T02:09:58.444Z',
    },
    {
      userId: '0f6f50f2-ef72-462b-8bc3-c72aba6fc938',
      roleId: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
      assignedAt: '2023-09-21T02:10:42.647Z',
    },
    {
      userId: '0d769e00-db8c-48d1-b95f-081e9065719b',
      roleId: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
      assignedAt: '2023-09-21T02:11:04.656Z',
    },
    {
      userId: 'f578fc27-a6b7-4dbe-97ca-00d2872c2fa7',
      roleId: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
      assignedAt: '2023-09-21T02:21:19.224Z',
    },
    {
      userId: 'ed342390-3878-408d-810a-0e31c33f68c9',
      roleId: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
      assignedAt: '2023-09-21T04:32:21.952Z',
    },
    {
      userId: '556dbf8e-5c8d-4a28-9da0-6a2916b8f193',
      roleId: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
      assignedAt: '2023-09-25T03:35:02.439Z',
    },
  ],
  rolePermissions: [
    {
      roleId: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
      permissionId: 'ef39938d-3777-4307-8b13-972670907287',
    },
    {
      roleId: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
      permissionId: '061902ce-be41-4008-9b22-cbef121156c7',
    },
  ],
};
export const mockRolesAll = {
  data: [mockRoles],
  total: 1,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
};
export const createRolesDto = {
  name: 'user',
  description: 'User',
} as CreateRoleDto;
export const updateRoles = {
  id: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
  updatedDto: {
    name: 'user',
    description: 'User',
  } as UpdateRoleDto,
};
