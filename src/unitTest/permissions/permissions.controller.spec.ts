import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from '../../controllers';
import { PermissionsService } from '../../useCases/permissions.service';
import {
  createPermissionsDto,
  mockPermissions,
  mockPermissionsAll,
  updatePermissions,
} from './permissions.data';

const mockPermissionsService = {
  findAll: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneByName: jest.fn(),
};

describe('PermissionsController', () => {
  let controller: PermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [
        {
          provide: PermissionsService,
          useValue: mockPermissionsService,
        },
      ],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should get all permission', async () => {
      jest
        .spyOn(mockPermissionsService, 'findAll')
        .mockReturnValue(mockPermissionsAll);

      const permissionArr = await controller.findAll();

      expect(mockPermissionsService.findAll).toBeCalled();
      expect(permissionArr).toEqual(mockPermissionsAll);
    });
  });

  describe('findOne', () => {
    it('Should find a permission via ID', async () => {
      jest
        .spyOn(mockPermissionsService, 'findOne')
        .mockReturnValue(mockPermissions);

      const permission = await controller.findOne(mockPermissions.id);
      expect(mockPermissionsService.findOne).toBeCalled();
      expect(mockPermissionsService.findOne).toBeCalledWith(mockPermissions.id);
      expect(permission).toEqual(mockPermissions);
    });
  });

  describe('findOneByName', () => {
    it('Should find a permission via key', async () => {
      jest
        .spyOn(mockPermissionsService, 'findOneByName')
        .mockReturnValue(mockPermissions);

      const result = await controller.findOneByName(mockPermissions.name);

      expect(mockPermissionsService.findOneByName).toBeCalled();
      expect(mockPermissionsService.findOneByName).toBeCalledWith(
        mockPermissions.name,
      );
      expect(result).toEqual(mockPermissions);
    });
  });

  describe('create', () => {
    it('Should create a new permission', async () => {
      jest
        .spyOn(mockPermissionsService, 'create')
        .mockReturnValue(mockPermissions);

      const permission = await controller.create(createPermissionsDto);

      expect(mockPermissionsService.create).toBeCalled();
      expect(mockPermissionsService.create).toBeCalledWith(
        createPermissionsDto,
      );
      expect(permission).toEqual(mockPermissions);
    });
  });

  describe('update', () => {
    it('Should update a permission', async () => {
      jest
        .spyOn(mockPermissionsService, 'update')
        .mockReturnValue(mockPermissions);
      const result = await controller.update({
        id: updatePermissions.id,
        permission: updatePermissions.updatedPermissionsDto,
      });
      expect(mockPermissionsService.update).toBeCalled();
      expect(mockPermissionsService.update).toBeCalledWith(
        updatePermissions.id,
        updatePermissions.updatedPermissionsDto,
      );
      expect(result).toEqual(mockPermissions);
    });
  });

  describe('delete', () => {
    it('Should delete a permission', async () => {
      const msgDelete = `Deleted id=${mockPermissions.id} successfully!`;
      jest.spyOn(mockPermissionsService, 'delete').mockReturnValue(msgDelete);
      const result = await controller.delete(mockPermissions.id);

      expect(mockPermissionsService.delete).toBeCalled();
      expect(mockPermissionsService.delete).toBeCalledWith(mockPermissions.id);
      expect(result).toEqual(msgDelete);
    });
  });
});
