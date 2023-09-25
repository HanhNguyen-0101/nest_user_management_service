import { Test, TestingModule } from '@nestjs/testing';
import { RolePermissionsService } from './../../role-permissions/role-permissions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolePermission } from '../../role-permissions/entities/role-permission.entity';
import {
  createRolePermissionsDto,
  mockRolePermissions,
  mockRolePermissionsAll,
  updateRolePermissions,
} from './role-permissions.data';

const mockRolePermissionsService = {
  findAndCount: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('RolePermissionsService', () => {
  let service: RolePermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolePermissionsService,
        {
          provide: getRepositoryToken(RolePermission),
          useValue: mockRolePermissionsService,
        },
      ],
    }).compile();

    service = module.get<RolePermissionsService>(RolePermissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should get all role-permission', async () => {
      jest
        .spyOn(mockRolePermissionsService, 'findAndCount')
        .mockReturnValue([[mockRolePermissions], 1]);

      const result = await service.findAll();

      expect(mockRolePermissionsService.findAndCount).toBeCalled();
      expect(result).toEqual(mockRolePermissionsAll);
    });
  });

  describe('findOne', () => {
    it('Should find a role-permission via ID', async () => {
      jest
        .spyOn(mockRolePermissionsService, 'findOne')
        .mockReturnValue(mockRolePermissions);

      const result = await service.findOne({
        role_id: mockRolePermissions.roleId,
        permission_id: mockRolePermissions.permissionId,
      });
      expect(mockRolePermissionsService.findOne).toBeCalled();
      expect(mockRolePermissionsService.findOne).toBeCalledWith({
        where: {
          roleId: mockRolePermissions.roleId,
          permissionId: mockRolePermissions.permissionId,
        },
        relations: {
          permission: true,
          role: true,
        },
      });
      expect(result).toEqual(mockRolePermissions);
    });
  });

  describe('create', () => {
    it('Should create a new role-permission', async () => {
      jest
        .spyOn(mockRolePermissionsService, 'save')
        .mockReturnValue(mockRolePermissions);

      const result = await service.create(createRolePermissionsDto);

      expect(mockRolePermissionsService.save).toBeCalled();
      expect(mockRolePermissionsService.save).toBeCalledWith(
        createRolePermissionsDto,
      );
      expect(result).toEqual(mockRolePermissions);
    });
  });

  describe('update', () => {
    it('Should update a role-permission', async () => {
      jest
        .spyOn(mockRolePermissionsService, 'update')
        .mockReturnValue(mockRolePermissions);
      const result = await service.update(
        updateRolePermissions.params,
        updateRolePermissions.updatedDto,
      );
      expect(mockRolePermissionsService.update).toBeCalled();
      expect(mockRolePermissionsService.update).toBeCalledWith(
        {
          roleId: updateRolePermissions.params.role_id,
          permissionId: updateRolePermissions.params.permission_id,
        },
        updateRolePermissions.updatedDto,
      );
      expect(result).toEqual(mockRolePermissions);
    });
  });

  describe('delete', () => {
    it('Should delete a role-permission', async () => {
      const msgDelete = `Deleted roleId=${mockRolePermissions.roleId} & permissionId=${mockRolePermissions.permissionId} successfully!`;
      jest
        .spyOn(mockRolePermissionsService, 'delete')
        .mockReturnValue(msgDelete);
      const result = await service.delete({
        permission_id: mockRolePermissions.permissionId,
        role_id: mockRolePermissions.roleId,
      });

      expect(mockRolePermissionsService.delete).toBeCalled();
      expect(mockRolePermissionsService.delete).toBeCalledWith({
        roleId: mockRolePermissions.roleId,
        permissionId: mockRolePermissions.permissionId,
      });
      expect(result).toEqual(msgDelete);
    });
  });
});
