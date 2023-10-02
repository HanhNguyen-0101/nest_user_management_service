import { Test, TestingModule } from '@nestjs/testing';
import { MenusController } from '../../controllers';
import { MenusService } from '../../useCases';
import { createMenuDto, mockMenu, updateMenu } from './menus.data';

const mockMenuService = {
  findAll: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneByKey: jest.fn(),
};

describe('MenusController', () => {
  let controller: MenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MenusController],
      providers: [
        {
          provide: MenusService,
          useValue: mockMenuService,
        },
      ],
    }).compile();

    controller = module.get<MenusController>(MenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    it('Should get all menu', async () => {
      jest.spyOn(mockMenuService, 'findAll').mockReturnValue({
        data: [mockMenu],
        total: 1,
        currentPage: 1,
        nextPage: null,
        prevPage: null,
      });

      const menuArr = await controller.findAll();

      expect(mockMenuService.findAll).toBeCalled();
      expect(menuArr).toEqual({
        data: [mockMenu],
        total: 1,
        currentPage: 1,
        nextPage: null,
        prevPage: null,
      });
    });
  });

  describe('findOne', () => {
    it('Should find a menu via ID', async () => {
      jest.spyOn(mockMenuService, 'findOne').mockReturnValue(mockMenu);

      const menu = await controller.findOne(mockMenu.id);
      expect(mockMenuService.findOne).toBeCalled();
      expect(mockMenuService.findOne).toBeCalledWith(mockMenu.id);
      expect(menu).toEqual(mockMenu);
    });
  });

  describe('findOneByKey', () => {
    it('Should find a menu via key', async () => {
      jest.spyOn(mockMenuService, 'findOneByKey').mockReturnValue(mockMenu);

      const menu = await controller.findOneByKey(mockMenu.key);

      expect(mockMenuService.findOneByKey).toBeCalled();
      expect(mockMenuService.findOneByKey).toBeCalledWith(mockMenu.key);
      expect(menu).toEqual(mockMenu);
    });
  });

  describe('create', () => {
    it('Should create a new menu', async () => {
      jest.spyOn(mockMenuService, 'create').mockReturnValue(mockMenu);

      const menu = await controller.create(createMenuDto);

      expect(mockMenuService.create).toBeCalled();
      expect(mockMenuService.create).toBeCalledWith(createMenuDto);
      expect(menu).toEqual(mockMenu);
    });
  });

  describe('update', () => {
    it('Should update a menu', async () => {
      jest.spyOn(mockMenuService, 'update').mockReturnValue(mockMenu);
      const menu = await controller.update({
        id: updateMenu.id,
        updateMenuDto: updateMenu.updatedMenuDto,
      });
      expect(mockMenuService.update).toBeCalled();
      expect(mockMenuService.update).toBeCalledWith(
        updateMenu.id,
        updateMenu.updatedMenuDto,
      );
      expect(menu).toEqual(mockMenu);
    });
  });

  describe('delete', () => {
    it('Should delete a menu', async () => {
      const msgDelete = `Deleted id=${mockMenu.id} successfully!`;
      jest.spyOn(mockMenuService, 'delete').mockReturnValue(msgDelete);
      const result = await controller.delete(mockMenu.id);

      expect(mockMenuService.delete).toBeCalled();
      expect(mockMenuService.delete).toBeCalledWith(mockMenu.id);
      expect(result).toEqual(msgDelete);
    });
  });
});
