import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsService } from '../../useCases/permissions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Permission } from '../../core/entities';
import {
  createPermissionsDto,
  mockPermissions,
  mockPermissionsAll,
  updatePermissions,
} from './permissions.data';

const mockPermissionsService = {
  findAndCount: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('PermissionsService', () => {
  let service: PermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsService,
        {
          provide: getRepositoryToken(Permission),
          useValue: mockPermissionsService,
        },
      ],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should get all permission', async () => {
      jest
        .spyOn(mockPermissionsService, 'findAndCount')
        .mockReturnValue([[mockPermissions], 1]);

      const permissionArr = await service.findAll();

      expect(mockPermissionsService.findAndCount).toBeCalled();
      expect(permissionArr).toEqual(mockPermissionsAll);
    });
  });

  describe('findOne', () => {
    it('Should find a permission via ID', async () => {
      jest
        .spyOn(mockPermissionsService, 'findOne')
        .mockReturnValue(mockPermissions);

      const permission = await service.findOne(mockPermissions.id);
      expect(mockPermissionsService.findOne).toBeCalled();
      expect(mockPermissionsService.findOne).toBeCalledWith({
        where: { id: mockPermissions.id },
        relations: {
          rolePermissions: {
            role: true,
          },
          permissionGroup: true,
        },
      });
      expect(permission).toEqual(mockPermissions);
    });
  });

  describe('findOneByName', () => {
    it('Should find a permission via name', async () => {
      jest
        .spyOn(mockPermissionsService, 'findOne')
        .mockReturnValue(mockPermissions);

      const permission = await service.findOneByName(mockPermissions.name);

      expect(mockPermissionsService.findOne).toBeCalled();
      expect(mockPermissionsService.findOne).toBeCalledWith({
        where: {
          name: mockPermissions.name,
        },
      });
      expect(permission).toEqual(mockPermissions);
    });
  });

  describe('create', () => {
    it('Should create a new permission', async () => {
      jest
        .spyOn(mockPermissionsService, 'save')
        .mockReturnValue(mockPermissions);

      const result = await service.create(createPermissionsDto);

      expect(mockPermissionsService.save).toBeCalled();
      expect(mockPermissionsService.save).toBeCalledWith(createPermissionsDto);
      expect(result).toEqual(mockPermissions);
    });
  });

  describe('update', () => {
    it('Should update a permission', async () => {
      jest
        .spyOn(mockPermissionsService, 'update')
        .mockReturnValue(mockPermissions);
      const result = await service.update(
        updatePermissions.id,
        updatePermissions.updatedPermissionsDto,
      );
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
      const result = await service.delete(mockPermissions.id);

      expect(mockPermissionsService.delete).toBeCalled();
      expect(mockPermissionsService.delete).toBeCalledWith(mockPermissions.id);
      expect(result).toEqual(msgDelete);
    });
  });
});
