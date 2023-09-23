import { Test, TestingModule } from '@nestjs/testing';
import { MenusService } from './menus.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';

const mockMenu = {
  id: 'f6f523ae-7942-44a5-b968-57bb7cf85264',
  name: 'Mdm Vsl Cntr',
  createdAt: '2023-09-10T09:34:58.942Z',
  updatedAt: '2023-09-10T09:34:58.942Z',
  key: 'mdm_vsl_cntr',
  parentId: 'efa99cdc-565d-418f-92ae-f1ed18e7828c',
  parentMenu: {
    id: 'efa99cdc-565d-418f-92ae-f1ed18e7828c',
    name: 'Vessel Management',
    createdAt: '2023-09-10T09:32:05.117Z',
    updatedAt: '2023-09-20T16:33:33.627Z',
    key: 'vessel-management-main',
    parentId: null,
  },
};
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
  let model: Repository<Menu>;

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
    model = module.get<Repository<Menu>>(getRepositoryToken(Menu));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should get all restaurants', async () => {
      jest
        .spyOn(model, 'findAndCount')
        .mockImplementationOnce(
          jest.fn().mockResolvedValueOnce([[mockMenu], 1]),
        );
      const menuArr = await service.findAll();
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
      jest
        .spyOn(model, 'findOne')
        .mockImplementationOnce(jest.fn().mockResolvedValue(mockMenu));
      const menu = await service.findOne(mockMenu.id);
      expect(menu).toEqual(mockMenu);
    });
  });

  describe('findOneByKey', () => {
    it('Should find a menu via key', async () => {
      jest
        .spyOn(model, 'findOneBy')
        .mockImplementationOnce(jest.fn().mockResolvedValue(mockMenu));
      const menu = await service.findOneByKey(mockMenu.key);
      expect(menu).toEqual(mockMenu);
    });
  });

  describe('create', () => {
    const newMenu = {
      name: 'Mdm Vsl Cntr',
      key: 'mdm_vsl_cntr',
      parentId: 'efa99cdc-565d-418f-92ae-f1ed18e7828c',
    };

    it('Should create a new menu', async () => {
      jest
        .spyOn(model, 'save')
        .mockImplementationOnce(jest.fn().mockResolvedValue(mockMenu));
      const menu = await service.create(newMenu);
      expect(menu).toEqual(mockMenu);
    });
  });

  describe('update', () => {
    const updateMenu = {
      id: 'f6f523ae-7942-44a5-b968-57bb7cf85264',
      updatedMenuDto: {
        name: 'Mdm Vsl Cntr',
        key: 'mdm_vsl_cntr',
        parentId: 'efa99cdc-565d-418f-92ae-f1ed18e7828c',
      },
    };

    it('Should update a menu', async () => {
      jest
        .spyOn(model, 'update')
        .mockImplementationOnce(jest.fn().mockResolvedValue(mockMenu));
      await service.update(updateMenu.id, updateMenu.updatedMenuDto);
      jest
        .spyOn(model, 'findOne')
        .mockImplementationOnce(jest.fn().mockResolvedValue(mockMenu));
      const menu = await service.findOne(updateMenu.id);
      expect(menu).toEqual(mockMenu);
    });
  });

  describe('delete', () => {
    const msgDelete = `Deleted id=${mockMenu.id} successfully!`;
    it('Should delete a menu', async () => {
      jest
        .spyOn(model, 'delete')
        .mockImplementationOnce(jest.fn().mockResolvedValue(msgDelete));
      const msg = await service.delete(mockMenu.id);
      expect(msg).toEqual(msgDelete);
    });
  });
});
