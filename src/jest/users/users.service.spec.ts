import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { KafkaProducerProvider } from '../../providers/kafka-producer.provider';
import { RolesService } from '../../useCases/roles.service';
import { UserRolesService } from '../../useCases/user-roles.service';
import { User } from '../../entities/user.entity';
import { UsersService } from '../../useCases/users.service';
import { createUsersDto, mockUsers, mockUsersAll } from './users.data';

const mockUsersService = {
  findAndCount: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
  hashPassword: jest.fn(),
};
const mockUserRolesService = {
  create: jest.fn(),
};
const mockRolesService = {
  findOneByName: jest.fn(),
};
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersService,
        },
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
        {
          provide: UserRolesService,
          useValue: mockUserRolesService,
        },
        KafkaProducerProvider,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  }, 30000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should get all user', async () => {
      jest
        .spyOn(mockUsersService, 'findAndCount')
        .mockReturnValue([[mockUsers], 1]);

      const result = await service.findAll();

      expect(mockUsersService.findAndCount).toBeCalled();
      expect(result).toEqual(mockUsersAll);
    });
  });

  describe('findOne', () => {
    it('Should find a user via ID', async () => {
      jest.spyOn(mockUsersService, 'findOne').mockReturnValue(mockUsers);

      const result = await service.findOne(mockUsers.id);
      expect(mockUsersService.findOne).toBeCalled();
      expect(mockUsersService.findOne).toBeCalledWith({
        where: { id: mockUsers.id },
        relations: {
          updatedByUser: true,
          userRoles: {
            role: {
              rolePermissions: {
                permission: true,
              },
            },
          },
        },
      });
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOneByEmail', () => {
    it('Should find a user via email', async () => {
      jest.spyOn(mockUsersService, 'findOneBy').mockReturnValue(mockUsers);

      const result = await service.findOneByEmail(mockUsers.email);
      expect(mockUsersService.findOneBy).toBeCalled();
      expect(mockUsersService.findOneBy).toBeCalledWith({
        email: mockUsers.email,
      });
      expect(result).toEqual(mockUsers);
    });
  });

  // describe('create', () => {
  //   it('Should create a new user', async () => {
  //     jest.spyOn(mockUsersService, 'save').mockReturnValue({
  //       ...createUsersDto,
  //       password: mockUsers.password,
  //     });
  //     const result = await service.create(createUsersDto);

  //     expect(mockUsersService.save).toBeCalled();
  //     expect(mockUsersService.save).toBeCalledWith(createUsersDto);
  //     expect(result).toEqual(mockUsers);
  //   });
  // });

  // describe('update', () => {
  //   it('Should update a role', async () => {
  //     jest.spyOn(mockUsersService, 'update').mockReturnValue(mockUsers);
  //     const result = await service.update(
  //       updateRoles.id,
  //       updateRoles.updatedDto,
  //     );
  //     expect(mockUsersService.update).toBeCalled();
  //     expect(mockUsersService.update).toBeCalledWith(
  //       updateRoles.id,
  //       updateRoles.updatedDto,
  //     );
  //     expect(result).toEqual(mockUsers);
  //   });
  // });

  describe('delete', () => {
    it('Should delete a user', async () => {
      const msgDelete = `Deleted id=${mockUsers.id} successfully!`;
      jest.spyOn(mockUsersService, 'delete').mockReturnValue(msgDelete);
      const result = await service.delete(mockUsers.id);

      expect(mockUsersService.delete).toBeCalled();
      expect(mockUsersService.delete).toBeCalledWith(mockUsers.id);
      expect(result).toEqual(msgDelete);
    });
  });
});
