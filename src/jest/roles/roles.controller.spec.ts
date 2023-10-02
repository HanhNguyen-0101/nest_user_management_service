import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from '../../controllers/roles.controller';
import { RolesService } from '../../useCases/roles.service';
import {
  createRolesDto,
  mockRoles,
  mockRolesAll,
  updateRoles,
} from './roles.data';

const mockRolesService = {
  findAll: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneByName: jest.fn(),
};

describe('RolesController', () => {
  let controller: RolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should get all permission', async () => {
      jest.spyOn(mockRolesService, 'findAll').mockReturnValue(mockRolesAll);

      const permissionArr = await controller.findAll();

      expect(mockRolesService.findAll).toBeCalled();
      expect(permissionArr).toEqual(mockRolesAll);
    });
  });

  describe('findOne', () => {
    it('Should find a permission via ID', async () => {
      jest.spyOn(mockRolesService, 'findOne').mockReturnValue(mockRoles);

      const permission = await controller.findOne(mockRoles.id);
      expect(mockRolesService.findOne).toBeCalled();
      expect(mockRolesService.findOne).toBeCalledWith(mockRoles.id);
      expect(permission).toEqual(mockRoles);
    });
  });

  describe('findOneByName', () => {
    it('Should find a permission via key', async () => {
      jest.spyOn(mockRolesService, 'findOneByName').mockReturnValue(mockRoles);

      const result = await controller.findOneByName(mockRoles.name);

      expect(mockRolesService.findOneByName).toBeCalled();
      expect(mockRolesService.findOneByName).toBeCalledWith(mockRoles.name);
      expect(result).toEqual(mockRoles);
    });
  });

  describe('create', () => {
    it('Should create a new permission', async () => {
      jest.spyOn(mockRolesService, 'create').mockReturnValue(mockRoles);

      const permission = await controller.create(createRolesDto);

      expect(mockRolesService.create).toBeCalled();
      expect(mockRolesService.create).toBeCalledWith(createRolesDto);
      expect(permission).toEqual(mockRoles);
    });
  });

  describe('update', () => {
    it('Should update a permission', async () => {
      jest.spyOn(mockRolesService, 'update').mockReturnValue(mockRoles);
      const result = await controller.update({
        id: updateRoles.id,
        role: updateRoles.updatedDto,
      });
      expect(mockRolesService.update).toBeCalled();
      expect(mockRolesService.update).toBeCalledWith(
        updateRoles.id,
        updateRoles.updatedDto,
      );
      expect(result).toEqual(mockRoles);
    });
  });

  describe('delete', () => {
    it('Should delete a permission', async () => {
      const msgDelete = `Deleted id=${mockRoles.id} successfully!`;
      jest.spyOn(mockRolesService, 'delete').mockReturnValue(msgDelete);
      const result = await controller.delete(mockRoles.id);

      expect(mockRolesService.delete).toBeCalled();
      expect(mockRolesService.delete).toBeCalledWith(mockRoles.id);
      expect(result).toEqual(msgDelete);
    });
  });
});
