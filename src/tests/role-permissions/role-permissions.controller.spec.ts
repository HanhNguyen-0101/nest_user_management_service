import { Test, TestingModule } from '@nestjs/testing';
import { RolePermissionsController } from '../../presentation/controllers';
import { RolePermissionsService } from '../../application/use-cases';
import {
  createRolePermissionsDto,
  mockRolePermissions,
  mockRolePermissionsAll,
  updateRolePermissions,
} from './role-permissions.data';

const mockRolePermissionsService = {
  findAll: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('RolePermissionsController', () => {
  let controller: RolePermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolePermissionsController],
      providers: [
        {
          provide: RolePermissionsService,
          useValue: mockRolePermissionsService,
        },
      ],
    }).compile();

    controller = module.get<RolePermissionsController>(
      RolePermissionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should get all permission', async () => {
      jest
        .spyOn(mockRolePermissionsService, 'findAll')
        .mockReturnValue(mockRolePermissionsAll);

      const permissionArr = await controller.findAll();

      expect(mockRolePermissionsService.findAll).toBeCalled();
      expect(permissionArr).toEqual(mockRolePermissionsAll);
    });
  });

  describe('findOne', () => {
    it('Should find a permission via ID', async () => {
      jest
        .spyOn(mockRolePermissionsService, 'findOne')
        .mockReturnValue(mockRolePermissions);

      const permission = await controller.findOne({
        role_id: mockRolePermissions.roleId,
        permission_id: mockRolePermissions.permissionId,
      });
      expect(mockRolePermissionsService.findOne).toBeCalled();
      expect(mockRolePermissionsService.findOne).toBeCalledWith({
        role_id: mockRolePermissions.roleId,
        permission_id: mockRolePermissions.permissionId,
      });
      expect(permission).toEqual(mockRolePermissions);
    });
  });

  describe('create', () => {
    it('Should create a new permission', async () => {
      jest
        .spyOn(mockRolePermissionsService, 'create')
        .mockReturnValue(mockRolePermissions);

      const permission = await controller.create(createRolePermissionsDto);

      expect(mockRolePermissionsService.create).toBeCalled();
      expect(mockRolePermissionsService.create).toBeCalledWith(
        createRolePermissionsDto,
      );
      expect(permission).toEqual(mockRolePermissions);
    });
  });

  describe('update', () => {
    it('Should update a permission', async () => {
      jest
        .spyOn(mockRolePermissionsService, 'update')
        .mockReturnValue(mockRolePermissions);
      const result = await controller.update({
        params: updateRolePermissions.params,
        updateRolePermissionDto: updateRolePermissions.updatedDto,
      });
      expect(mockRolePermissionsService.update).toBeCalled();
      expect(mockRolePermissionsService.update).toBeCalledWith(
        updateRolePermissions.params,
        updateRolePermissions.updatedDto,
      );
      expect(result).toEqual(mockRolePermissions);
    });
  });

  describe('delete', () => {
    it('Should delete a permission', async () => {
      const msgDelete = `Deleted roleId=${mockRolePermissions.roleId} & permissionId=${mockRolePermissions.permissionId} successfully!`;
      jest
        .spyOn(mockRolePermissionsService, 'delete')
        .mockReturnValue(msgDelete);
      const result = await controller.delete({
        permission_id: mockRolePermissions.permissionId,
        role_id: mockRolePermissions.roleId,
      });

      expect(mockRolePermissionsService.delete).toBeCalled();
      expect(mockRolePermissionsService.delete).toBeCalledWith({
        permission_id: mockRolePermissions.permissionId,
        role_id: mockRolePermissions.roleId,
      });
      expect(result).toEqual(msgDelete);
    });
  });
});
