import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PermissionGroup } from '../../entities/permission-group.entity';
import { PermissionGroupsService } from '../../useCases/permission-groups.service';
import {
  createPermissionGroupsDto,
  mockPermissionGroups,
  mockPermissionGroupsAll,
  updatePermissionGroups,
} from './permission-groups.data';

const mockPermissionGroupsService = {
  findAndCount: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('PermissionGroupsService', () => {
  let service: PermissionGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionGroupsService,
        {
          provide: getRepositoryToken(PermissionGroup),
          useValue: mockPermissionGroupsService,
        },
      ],
    }).compile();

    service = module.get<PermissionGroupsService>(PermissionGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should get all permissionGroup', async () => {
      jest
        .spyOn(mockPermissionGroupsService, 'findAndCount')
        .mockReturnValue([[mockPermissionGroups], 1]);

      const permissionGroupArr = await service.findAll();

      expect(mockPermissionGroupsService.findAndCount).toBeCalled();
      expect(permissionGroupArr).toEqual(mockPermissionGroupsAll);
    });
  });

  describe('findOne', () => {
    it('Should find a permissionGroup via ID', async () => {
      jest
        .spyOn(mockPermissionGroupsService, 'findOne')
        .mockReturnValue(mockPermissionGroups);

      const permissionGroup = await service.findOne(mockPermissionGroups.id);
      expect(mockPermissionGroupsService.findOne).toBeCalled();
      expect(mockPermissionGroupsService.findOne).toBeCalledWith({
        where: { id: mockPermissionGroups.id },
      });
      expect(permissionGroup).toEqual(mockPermissionGroups);
    });
  });

  describe('findOneByName', () => {
    it('Should find a permissionGroup via name', async () => {
      jest
        .spyOn(mockPermissionGroupsService, 'findOne')
        .mockReturnValue(mockPermissionGroups);

      const permissionGroup = await service.findOneByName(mockPermissionGroups.name);

      expect(mockPermissionGroupsService.findOne).toBeCalled();
      expect(mockPermissionGroupsService.findOne).toBeCalledWith({
        where: {
          name: mockPermissionGroups.name,
        },
      });
      expect(permissionGroup).toEqual(mockPermissionGroups);
    });
  });

  describe('create', () => {
    it('Should create a new permissionGroup', async () => {
      jest
        .spyOn(mockPermissionGroupsService, 'save')
        .mockReturnValue(mockPermissionGroups);

      const result = await service.create(createPermissionGroupsDto);

      expect(mockPermissionGroupsService.save).toBeCalled();
      expect(mockPermissionGroupsService.save).toBeCalledWith(
        createPermissionGroupsDto,
      );
      expect(result).toEqual(mockPermissionGroups);
    });
  });

  describe('update', () => {
    it('Should update a permissionGroup', async () => {
      jest
        .spyOn(mockPermissionGroupsService, 'update')
        .mockReturnValue(mockPermissionGroups);
      const result = await service.update(
        updatePermissionGroups.id,
        updatePermissionGroups.updatedPermissionGroupsDto,
      );
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
      const result = await service.delete(mockPermissionGroups.id);

      expect(mockPermissionGroupsService.delete).toBeCalled();
      expect(mockPermissionGroupsService.delete).toBeCalledWith(
        mockPermissionGroups.id,
      );
      expect(result).toEqual(msgDelete);
    });
  });
});
