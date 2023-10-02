import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Menu } from '../../core/entities/menu.entity';
import { MenusService } from '../../useCases/menus.service';
import { createMenuDto, mockMenu, updateMenu } from './menus.data';

const mockMenuService = {
  findAndCount: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
};

describe('MenusService', () => {
  let service: MenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenusService,
        {
          provide: getRepositoryToken(Menu),
          useValue: mockMenuService,
        },
      ],
    }).compile();

    service = module.get<MenusService>(MenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should get all menu', async () => {
      jest
        .spyOn(mockMenuService, 'findAndCount')
        .mockReturnValue([[mockMenu], 1]);

      const menuArr = await service.findAll();

      expect(mockMenuService.findAndCount).toBeCalled();
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

      const menu = await service.findOne(mockMenu.id);
      expect(mockMenuService.findOne).toBeCalled();
      expect(mockMenuService.findOne).toBeCalledWith({
        where: { id: mockMenu.id },
        relations: {
          parentMenu: true,
        },
      });
      expect(menu).toEqual(mockMenu);
    });
  });

  describe('findOneByKey', () => {
    it('Should find a menu via key', async () => {
      jest.spyOn(mockMenuService, 'findOneBy').mockReturnValue(mockMenu);

      const menu = await service.findOneByKey(mockMenu.key);

      expect(mockMenuService.findOneBy).toBeCalled();
      expect(mockMenuService.findOneBy).toBeCalledWith({ key: mockMenu.key });
      expect(menu).toEqual(mockMenu);
    });
  });

  describe('create', () => {
    it('Should create a new menu', async () => {
      jest.spyOn(mockMenuService, 'save').mockReturnValue(mockMenu);

      const menu = await service.create(createMenuDto);

      expect(mockMenuService.save).toBeCalled();
      expect(mockMenuService.save).toBeCalledWith(createMenuDto);
      expect(menu).toEqual(mockMenu);
    });
  });

  describe('update', () => {
    it('Should update a menu', async () => {
      jest.spyOn(mockMenuService, 'update').mockReturnValue(mockMenu);
      const menu = await service.update(
        updateMenu.id,
        updateMenu.updatedMenuDto,
      );
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
      const result = await service.delete(mockMenu.id);

      expect(mockMenuService.delete).toBeCalled();
      expect(mockMenuService.delete).toBeCalledWith(mockMenu.id);
      expect(result).toEqual(msgDelete);
    });
  });
});
