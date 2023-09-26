import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../auth/auth.controller';
import { AuthService } from '../../auth/auth.service';
import { mockLogin, mockUsers } from './auth.data';

const mockAuthService = {
  resetPassword: jest.fn(),
  register: jest.fn(),
  login: jest.fn(),
  googleRegister: jest.fn(),
  googleLogin: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('resetPassword', () => {
    it('Should reset password', async () => {
      jest.spyOn(mockAuthService, 'resetPassword').mockReturnValue(mockUsers);

      const result = await controller.resetPassword(mockUsers);

      expect(mockAuthService.resetPassword).toBeCalled();
      expect(mockAuthService.resetPassword).toBeCalledWith(mockUsers);
      expect(result).toEqual(mockUsers);
    });
  });

  describe('register', () => {
    it('Should register', async () => {
      jest.spyOn(mockAuthService, 'register').mockReturnValue(mockUsers);

      const result = await controller.register(mockUsers);
      expect(mockAuthService.register).toBeCalled();
      expect(mockAuthService.register).toBeCalledWith(mockUsers);
      expect(result).toEqual(mockUsers);
    });
  });

  describe('login', () => {
    it('Should login', async () => {
      jest.spyOn(mockAuthService, 'login').mockReturnValue(mockLogin);

      const result = await controller.login(mockUsers);

      expect(mockAuthService.login).toBeCalled();
      expect(mockAuthService.login).toBeCalledWith(mockUsers);
      expect(result).toEqual(mockLogin);
    });
  });

  describe('googleRegister', () => {
    it('Should google register', async () => {
      jest.spyOn(mockAuthService, 'googleRegister').mockReturnValue(mockUsers);

      const result = await controller.googleRegister(mockUsers);

      expect(mockAuthService.googleRegister).toBeCalled();
      expect(mockAuthService.googleRegister).toBeCalledWith(mockUsers);
      expect(result).toEqual(mockUsers);
    });
  });

  describe('googleLogin', () => {
    it('Should google login', async () => {
      jest.spyOn(mockAuthService, 'googleLogin').mockReturnValue(mockLogin);
      const result = await controller.googleLogin(mockUsers);
      expect(mockAuthService.googleLogin).toBeCalled();
      expect(mockAuthService.googleLogin).toBeCalledWith(mockUsers);
      expect(result).toEqual(mockLogin);
    });
  });
});
