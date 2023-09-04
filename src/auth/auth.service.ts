import { Injectable, Inject } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Producer } from 'kafkajs';
import { requestPatterns } from 'src/utils/constants';

const { tables, requests } = requestPatterns;

@Injectable()
export class AuthService {
  constructor(
    @Inject('KafkaProducer')
    private readonly kafkaProducer: Producer,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    return await this.generateToken({ id: user.id, email: user.email });
  }

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    const newUser = await this.userService.create({
      ...registerUserDto,
      updatedBy: null,
    });
    await this.kafkaProducer.send({
      topic: `${tables.auth}.${requests.sendSignUpMsg}`,
      messages: [
        {
          value: JSON.stringify(newUser),
        },
      ],
    });
    return newUser;
  }

  async googleRegister(registerUser): Promise<any> {
    const newUser = await this.userRepository.save(registerUser);
    await this.kafkaProducer.send({
      topic: `${tables.auth}.${requests.sendSignUpMsg}`,
      messages: [
        {
          value: JSON.stringify(newUser),
        },
      ],
    });
    return newUser;
  }

  async googleLogin(user) {
    return await this.generateToken({ id: user.id, email: user.email });
  }

  private async generateToken(payload: {
    id: string;
    email: string;
  }): Promise<any> {
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      access_token: accessToken,
    };
  }
}
