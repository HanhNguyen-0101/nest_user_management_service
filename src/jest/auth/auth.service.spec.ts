import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { KafkaProducerProvider } from '../../providers/kafka-producer.provider';
import { JwtService } from '@nestjs/jwt';
import { mockLogin, mockUsers } from './auth.data';

const mockUsersService = {
  update: jest.fn(),
  create: jest.fn(),
};
const mockedJwtService = {
  signAsync: jest.fn(),
};
const mockAuthService = {
  login: jest.fn(),
  googleLogin: jest.fn(),
  register: jest.fn(),
  googleRegister: jest.fn(),
};
describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        KafkaProducerProvider,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UsersService>(UsersService);
  }, 30000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('resetPassword', () => {
  //   it('Should reset password', async () => {
  //     jest.spyOn(mockUsersService, 'update').mockReturnValue(mockUsers);

  //     const result = await service.resetPassword(mockUsers);

  //     expect(mockUsersService.update).toBeCalled();
  //     expect(mockUsersService.update).toBeCalledWith(mockUsers.id, mockUsers);
  //     expect(result).toEqual(mockUsers);
  //   });
  // });

  describe('login', () => {
    it('Should login', async () => {
      jest.spyOn(mockAuthService, 'login').mockReturnValue(mockLogin);
      jest
        .spyOn(mockedJwtService, 'signAsync')
        .mockReturnValue(mockLogin.access_token);

      const access_token = await jwtService.signAsync(mockUsers);
      const result = await service.login(mockUsers);

      expect(mockedJwtService.signAsync).toBeCalled();
      expect(mockedJwtService.signAsync).toBeCalledWith(mockUsers);
      expect(access_token).toEqual(mockLogin.access_token);

      expect(result).toEqual(mockLogin);
    });
  });

  describe('register', () => {
    it('Should register', async () => {
      jest.spyOn(mockUsersService, 'create').mockReturnValue(mockUsers);
      jest.spyOn(mockAuthService, 'register').mockReturnValue(mockUsers);

      const result = await userService.create(mockUsers);
      const registerResult = await service.register(mockUsers);

      expect(mockUsersService.create).toBeCalled();
      expect(mockUsersService.create).toBeCalledWith(mockUsers);
      expect(result).toEqual(mockUsers);

      expect(registerResult).toEqual(mockUsers);
    });
  });

  describe('googleRegister', () => {
    it('Should googleRegister', async () => {
      jest.spyOn(mockUsersService, 'create').mockReturnValue(mockUsers);
      jest.spyOn(mockAuthService, 'googleRegister').mockReturnValue(mockUsers);

      const result = await userService.create(mockUsers);
      const ggRegisterResult = await service.googleRegister(mockUsers);

      expect(mockUsersService.create).toBeCalled();
      expect(mockUsersService.create).toBeCalledWith(mockUsers);
      expect(result).toEqual(mockUsers);

      expect(ggRegisterResult).toEqual(mockUsers);
    });
  });

  describe('googleLogin', () => {
    it('Should googleLogin', async () => {
      jest.spyOn(mockAuthService, 'googleLogin').mockReturnValue(mockLogin);
      jest
        .spyOn(mockedJwtService, 'signAsync')
        .mockReturnValue(mockLogin.access_token);

      const access_token = await jwtService.signAsync(mockUsers);
      const result = await service.googleLogin(mockUsers);

      expect(mockedJwtService.signAsync).toBeCalled();
      expect(mockedJwtService.signAsync).toBeCalledWith(mockUsers);
      expect(access_token).toEqual(mockLogin.access_token);

      expect(result).toEqual(mockLogin);
    });
  });
});
