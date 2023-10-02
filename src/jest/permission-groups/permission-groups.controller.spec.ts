import { Test, TestingModule } from '@nestjs/testing';
import { PermissionGroupsController } from '../../permission-groups/permission-groups.controller';
import { PermissionGroupsService } from '../../useCases/permission-groups.service';
import {
  createPermissionGroupsDto,
  mockPermissionGroups,
  mockPermissionGroupsAll,
  updatePermissionGroups,
} from './permission-groups.data';

const mockPermissionGroupsService = {
  findAll: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneByName: jest.fn(),
};

describe('PermissionGroupsController', () => {
  let controller: PermissionGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionGroupsController],
      providers: [
        {
          provide: PermissionGroupsService,
          useValue: mockPermissionGroupsService,
        },
      ],
    }).compile();

    controller = module.get<PermissionGroupsController>(
      PermissionGroupsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should get all permissionGroup', async () => {
      jest
        .spyOn(mockPermissionGroupsService, 'findAll')
        .mockReturnValue(mockPermissionGroupsAll);

      const permissionGroupArr = await controller.findAll();

      expect(mockPermissionGroupsService.findAll).toBeCalled();
      expect(permissionGroupArr).toEqual(mockPermissionGroupsAll);
    });
  });

  describe('findOne', () => {
    it('Should find a permissionGroup via ID', async () => {
      jest
        .spyOn(mockPermissionGroupsService, 'findOne')
        .mockReturnValue(mockPermissionGroups);

      const permissionGroup = await controller.findOne(mockPermissionGroups.id);
      expect(mockPermissionGroupsService.findOne).toBeCalled();
      expect(mockPermissionGroupsService.findOne).toBeCalledWith(
        mockPermissionGroups.id,
      );
      expect(permissionGroup).toEqual(mockPermissionGroups);
    });
  });

  describe('findOneByName', () => {
    it('Should find a permissionGroup via key', async () => {
      jest
        .spyOn(mockPermissionGroupsService, 'findOneByName')
        .mockReturnValue(mockPermissionGroups);

      const result = await controller.findOneByName(mockPermissionGroups.name);

      expect(mockPermissionGroupsService.findOneByName).toBeCalled();
      expect(mockPermissionGroupsService.findOneByName).toBeCalledWith(
        mockPermissionGroups.name,
      );
      expect(result).toEqual(mockPermissionGroups);
    });
  });

  describe('create', () => {
    it('Should create a new permissionGroup', async () => {
      jest
        .spyOn(mockPermissionGroupsService, 'create')
        .mockReturnValue(mockPermissionGroups);

      const permissionGroup = await controller.create(
        createPermissionGroupsDto,
      );

      expect(mockPermissionGroupsService.create).toBeCalled();
      expect(mockPermissionGroupsService.create).toBeCalledWith(
        createPermissionGroupsDto,
      );
      expect(permissionGroup).toEqual(mockPermissionGroups);
    });
  });

  describe('update', () => {
    it('Should update a permissionGroup', async () => {
      jest
        .spyOn(mockPermissionGroupsService, 'update')
        .mockReturnValue(mockPermissionGroups);
      const result = await controller.update({
        id: updatePermissionGroups.id,
        permissionGroup: updatePermissionGroups.updatedPermissionGroupsDto,
      });
      expect(mockPermissionGroupsService.update).toBeCalled();
      expect(mockPermissionGroupsService.update).toBeCalledWith(
        updatePermissionGroups.id,
        updatePermissionGroups.updatedPermissionGroupsDto,
      );
      expect(result).toEqual(mockPermissionGroups);
    });
  });

  describe('delete', () => {
    it('Should delete a permissionGroup', async () => {
      const msgDelete = `Deleted id=${mockPermissionGroups.id} successfully!`;
      jest
        .spyOn(mockPermissionGroupsService, 'delete')
        .mockReturnValue(msgDelete);
      const result = await controller.delete(mockPermissionGroups.id);

      expect(mockPermissionGroupsService.delete).toBeCalled();
      expect(mockPermissionGroupsService.delete).toBeCalledWith(
        mockPermissionGroups.id,
      );
      expect(result).toEqual(msgDelete);
    });
  });
});
