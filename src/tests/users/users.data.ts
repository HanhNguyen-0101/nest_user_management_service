import { CreateUserDto, UpdateUserDto } from '../../presentation/models/user';

export const mockUsers = {
  id: 'ed342390-3878-408d-810a-0e31c33f68c9',
  email: 'resetpw@yopmail.com',
  isPending: true,
  isDisable: false,
  createdAt: '2023-09-21T04:32:21.789Z',
  updatedAt: '2023-09-21T04:32:21.789Z',
  updatedBy: null,
  firstName: 'Reset',
  lastName: 'PW',
  globalId: null,
  officeCode: null,
  country: null,
  password: '$2b$10$Mx.TPEacYLvuzgWur1Jo.eWZv5aORgpAe.bzA9bdLnOGJhc85c7yq',
  isRegisteredWithGoogle: false,
  updatedByUser: null,
  userRoles: [
    {
      userId: 'ed342390-3878-408d-810a-0e31c33f68c9',
      roleId: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
      assignedAt: '2023-09-21T04:32:21.952Z',
      role: {
        id: '956fb209-6d4a-46da-b2e8-94c1c03fa420',
        name: 'user',
        createdAt: '2023-09-20T16:43:34.228Z',
        updatedAt: '2023-09-20T16:43:34.228Z',
        createdBy: '69d139fc-4762-42e6-92e9-1c9841c5a619',
        updatedBy: null,
        description: 'User',
      },
    },
  ],
};
export const mockUsersAll = {
  data: [mockUsers],
  total: 1,
  currentPage: 1,
  nextPage: null,
  prevPage: null,
};
export const createUsersDto = {
  email: 'resetpw@yopmail.com',
  isPending: true,
  isDisable: false,
  updatedBy: null,
  firstName: 'Reset',
  lastName: 'PW',
  globalId: null,
  officeCode: null,
  country: null,
  password: '123',
  isRegisteredWithGoogle: false,
} as CreateUserDto;
export const updateUsers = {
  id: 'ed342390-3878-408d-810a-0e31c33f68c9',
  updatedDto: {
    email: 'resetpw@yopmail.com',
    isPending: true,
    isDisable: false,
    updatedBy: null,
    firstName: 'Reset',
    lastName: 'PW',
    globalId: null,
    officeCode: null,
    country: null,
    password: '123',
    isRegisteredWithGoogle: false,
  } as UpdateUserDto,
};
