import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from '../../useCases/roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../../entities/role.entity';
import {
  createRolesDto,
  mockRoles,
  mockRolesAll,
  updateRoles,
} from './roles.data';

const mockRolesService = {
  findAndCount: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
};

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRolesService,
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should get all role', async () => {
      jest
        .spyOn(mockRolesService, 'findAndCount')
        .mockReturnValue([[mockRoles], 1]);

      const result = await service.findAll();

      expect(mockRolesService.findAndCount).toBeCalled();
      expect(result).toEqual(mockRolesAll);
    });
  });

  describe('findOne', () => {
    it('Should find a role via ID', async () => {
      jest.spyOn(mockRolesService, 'findOne').mockReturnValue(mockRoles);

      const result = await service.findOne(mockRoles.id);
      expect(mockRolesService.findOne).toBeCalled();
      expect(mockRolesService.findOne).toBeCalledWith({
        where: { id: mockRoles.id },
        relations: {
          updatedByUser: true,
          createdByUser: true,
          userRoles: {
            user: true,
          },
          rolePermissions: {
            permission: true,
          },
        },
      });
      expect(result).toEqual(mockRoles);
    });
  });

  describe('findOneByName', () => {
    it('Should find a role via name', async () => {
      jest.spyOn(mockRolesService, 'findOneBy').mockReturnValue(mockRoles);

      const result = await service.findOneByName(mockRoles.name);
      expect(mockRolesService.findOneBy).toBeCalled();
      expect(mockRolesService.findOneBy).toBeCalledWith({
        name: mockRoles.name,
      });
      expect(result).toEqual(mockRoles);
    });
  });

  describe('create', () => {
    it('Should create a new role', async () => {
      jest.spyOn(mockRolesService, 'save').mockReturnValue(mockRoles);

      const result = await service.create(createRolesDto);

      expect(mockRolesService.save).toBeCalled();
      expect(mockRolesService.save).toBeCalledWith(createRolesDto);
      expect(result).toEqual(mockRoles);
    });
  });

  describe('update', () => {
    it('Should update a role', async () => {
      jest.spyOn(mockRolesService, 'update').mockReturnValue(mockRoles);
      const result = await service.update(
        updateRoles.id,
        updateRoles.updatedDto,
      );
      expect(mockRolesService.update).toBeCalled();
      expect(mockRolesService.update).toBeCalledWith(
        updateRoles.id,
        updateRoles.updatedDto,
      );
      expect(result).toEqual(mockRoles);
    });
  });

  describe('delete', () => {
    it('Should delete a role', async () => {
      const msgDelete = `Deleted id=${mockRoles.id} successfully!`;
      jest.spyOn(mockRolesService, 'delete').mockReturnValue(msgDelete);
      const result = await service.delete(mockRoles.id);

      expect(mockRolesService.delete).toBeCalled();
      expect(mockRolesService.delete).toBeCalledWith(mockRoles.id);
      expect(result).toEqual(msgDelete);
    });
  });
});
