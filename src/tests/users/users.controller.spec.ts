import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../presentation/controllers';
import { UsersService } from '../../application/use-cases';
import {
  createUsersDto,
  mockUsers,
  mockUsersAll,
  updateUsers,
} from './users.data';
const mockUsersService = {
  findAll: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneByEmail: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should get all user', async () => {
      jest.spyOn(mockUsersService, 'findAll').mockReturnValue(mockUsersAll);

      const permissionArr = await controller.findAll();

      expect(mockUsersService.findAll).toBeCalled();
      expect(permissionArr).toEqual(mockUsersAll);
    });
  });

  describe('findOne', () => {
    it('Should find a user via ID', async () => {
      jest.spyOn(mockUsersService, 'findOne').mockReturnValue(mockUsers);

      const permission = await controller.findOne(mockUsers.id);
      expect(mockUsersService.findOne).toBeCalled();
      expect(mockUsersService.findOne).toBeCalledWith(mockUsers.id);
      expect(permission).toEqual(mockUsers);
    });
  });

  describe('findOneByEmail', () => {
    it('Should find a user via email', async () => {
      jest.spyOn(mockUsersService, 'findOneByEmail').mockReturnValue(mockUsers);

      const result = await controller.findOneByEmail(mockUsers.email);

      expect(mockUsersService.findOneByEmail).toBeCalled();
      expect(mockUsersService.findOneByEmail).toBeCalledWith(mockUsers.email);
      expect(result).toEqual(mockUsers);
    });
  });

  describe('create', () => {
    it('Should create a new user', async () => {
      jest.spyOn(mockUsersService, 'create').mockReturnValue(mockUsers);

      const permission = await controller.create(createUsersDto);

      expect(mockUsersService.create).toBeCalled();
      expect(mockUsersService.create).toBeCalledWith(createUsersDto);
      expect(permission).toEqual(mockUsers);
    });
  });

  describe('update', () => {
    it('Should update a user', async () => {
      jest.spyOn(mockUsersService, 'update').mockReturnValue(mockUsers);
      const result = await controller.update({
        id: updateUsers.id,
        user: updateUsers.updatedDto,
      });
      expect(mockUsersService.update).toBeCalled();
      expect(mockUsersService.update).toBeCalledWith(
        updateUsers.id,
        updateUsers.updatedDto,
      );
      expect(result).toEqual(mockUsers);
    });
  });

  describe('delete', () => {
    it('Should delete a user', async () => {
      const msgDelete = `Deleted id=${mockUsers.id} successfully!`;
      jest.spyOn(mockUsersService, 'delete').mockReturnValue(msgDelete);
      const result = await controller.delete(mockUsers.id);

      expect(mockUsersService.delete).toBeCalled();
      expect(mockUsersService.delete).toBeCalledWith(mockUsers.id);
      expect(result).toEqual(msgDelete);
    });
  });
});
