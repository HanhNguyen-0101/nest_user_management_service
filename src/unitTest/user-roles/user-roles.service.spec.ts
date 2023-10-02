import { Test, TestingModule } from '@nestjs/testing';
import { UserRolesService } from '../../useCases';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRole } from '../../core/entities';
import {
  createUserRolesDto,
  mockUserRoles,
  mockUserRolesAll,
  updateUserRoles,
} from './user-roles.data';

const mockUserRolesService = {
  findAndCount: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UserRolesService', () => {
  let service: UserRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRolesService,
        {
          provide: getRepositoryToken(UserRole),
          useValue: mockUserRolesService,
        },
      ],
    }).compile();

    service = module.get<UserRolesService>(UserRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should get all user-role', async () => {
      jest
        .spyOn(mockUserRolesService, 'findAndCount')
        .mockReturnValue([[mockUserRoles], 1]);

      const result = await service.findAll();

      expect(mockUserRolesService.findAndCount).toBeCalled();
      expect(result).toEqual(mockUserRolesAll);
    });
  });

  describe('findOne', () => {
    it('Should find a user-role via ID', async () => {
      jest
        .spyOn(mockUserRolesService, 'findOne')
        .mockReturnValue(mockUserRoles);

      const result = await service.findOne({
        role_id: mockUserRoles.roleId,
        user_id: mockUserRoles.userId,
      });
      expect(mockUserRolesService.findOne).toBeCalled();
      expect(mockUserRolesService.findOne).toBeCalledWith({
        where: {
          userId: mockUserRoles.userId,
          roleId: mockUserRoles.roleId,
        },
        relations: {
          user: true,
          role: true,
        },
      });
      expect(result).toEqual(mockUserRoles);
    });
  });

  describe('create', () => {
    it('Should create a new user-role', async () => {
      jest.spyOn(mockUserRolesService, 'save').mockReturnValue(mockUserRoles);

      const result = await service.create(createUserRolesDto);

      expect(mockUserRolesService.save).toBeCalled();
      expect(mockUserRolesService.save).toBeCalledWith(createUserRolesDto);
      expect(result).toEqual(mockUserRoles);
    });
  });

  describe('update', () => {
    it('Should update a user-role', async () => {
      jest.spyOn(mockUserRolesService, 'update').mockReturnValue(mockUserRoles);
      const result = await service.update(
        updateUserRoles.params,
        updateUserRoles.updatedDto,
      );
      expect(mockUserRolesService.update).toBeCalled();
      expect(mockUserRolesService.update).toBeCalledWith(
        {
          roleId: updateUserRoles.params.role_id,
          userId: updateUserRoles.params.user_id,
        },
        updateUserRoles.updatedDto,
      );
      expect(result).toEqual(mockUserRoles);
    });
  });

  describe('delete', () => {
    it('Should delete a user-role', async () => {
      const msgDelete = `Deleted roleId=${mockUserRoles.roleId} & userId=${mockUserRoles.userId} successfully!`;
      jest.spyOn(mockUserRolesService, 'delete').mockReturnValue(msgDelete);
      const result = await service.delete({
        user_id: mockUserRoles.userId,
        role_id: mockUserRoles.roleId,
      });

      expect(mockUserRolesService.delete).toBeCalled();
      expect(mockUserRolesService.delete).toBeCalledWith({
        roleId: mockUserRoles.roleId,
        userId: mockUserRoles.userId,
      });
      expect(result).toEqual(msgDelete);
    });
  });
});
