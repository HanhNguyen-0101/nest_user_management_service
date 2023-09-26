import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { KafkaProducerProvider } from '../../providers/kafka-producer.provider';
import { JwtService } from '@nestjs/jwt';

const mockUsersService = {
  findAndCount: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
  hashPassword: jest.fn(),
};
const mockedJwtService = {};
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
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
  }, 30000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
