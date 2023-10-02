import { Test, TestingModule } from '@nestjs/testing';
import { UserRolesController } from '../../controllers/user-roles.controller';
import { UserRolesService } from '../../useCases/user-roles.service';
import {
  createUserRolesDto,
  mockUserRoles,
  mockUserRolesAll,
  updateUserRoles,
} from './user-roles.data';
const mockUserRolesService = {
  findAll: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UserRolesController', () => {
  let controller: UserRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRolesController],
      providers: [
        {
          provide: UserRolesService,
          useValue: mockUserRolesService,
        },
      ],
    }).compile();

    controller = module.get<UserRolesController>(UserRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should get all user-role', async () => {
      jest
        .spyOn(mockUserRolesService, 'findAll')
        .mockReturnValue(mockUserRolesAll);

      const result = await controller.findAll();

      expect(mockUserRolesService.findAll).toBeCalled();
      expect(result).toEqual(mockUserRolesAll);
    });
  });

  describe('findOne', () => {
    it('Should find a user-role via ID', async () => {
      jest
        .spyOn(mockUserRolesService, 'findOne')
        .mockReturnValue(mockUserRoles);

      const result = await controller.findOne({
        role_id: mockUserRoles.roleId,
        user_id: mockUserRoles.userId,
      });
      expect(mockUserRolesService.findOne).toBeCalled();
      expect(mockUserRolesService.findOne).toBeCalledWith({
        role_id: mockUserRoles.roleId,
        user_id: mockUserRoles.userId,
      });
      expect(result).toEqual(mockUserRoles);
    });
  });

  describe('create', () => {
    it('Should create a new user-role', async () => {
      jest.spyOn(mockUserRolesService, 'create').mockReturnValue(mockUserRoles);

      const result = await controller.create(createUserRolesDto);

      expect(mockUserRolesService.create).toBeCalled();
      expect(mockUserRolesService.create).toBeCalledWith(createUserRolesDto);
      expect(result).toEqual(mockUserRoles);
    });
  });

  describe('update', () => {
    it('Should update a user-role', async () => {
      jest.spyOn(mockUserRolesService, 'update').mockReturnValue(mockUserRoles);
      const result = await controller.update({
        params: updateUserRoles.params,
        updateUserRoleDto: updateUserRoles.updatedDto,
      });
      expect(mockUserRolesService.update).toBeCalled();
      expect(mockUserRolesService.update).toBeCalledWith(
        updateUserRoles.params,
        updateUserRoles.updatedDto,
      );
      expect(result).toEqual(mockUserRoles);
    });
  });

  describe('delete', () => {
    it('Should delete a user-role', async () => {
      const msgDelete = `Deleted roleId=${mockUserRoles.roleId} & userId=${mockUserRoles.userId} successfully!`;
      jest.spyOn(mockUserRolesService, 'delete').mockReturnValue(msgDelete);
      const result = await controller.delete({
        user_id: mockUserRoles.userId,
        role_id: mockUserRoles.roleId,
      });

      expect(mockUserRolesService.delete).toBeCalled();
      expect(mockUserRolesService.delete).toBeCalledWith({
        user_id: mockUserRoles.userId,
        role_id: mockUserRoles.roleId,
      });
      expect(result).toEqual(msgDelete);
    });
  });
});
