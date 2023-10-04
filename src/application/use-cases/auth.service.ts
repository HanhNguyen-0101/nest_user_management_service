import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generate } from 'generate-password';
import { Producer } from 'kafkajs';
import { requestPatterns } from '../../utils/constants';
import { UsersService } from './users.service';
import { IUserModel } from 'src/presentation/models';
import { User } from 'src/infrastructure/database/entities';

const { tables, requests } = requestPatterns;

@Injectable()
export class AuthService {
  constructor(
    @Inject('KafkaProducer')
    private readonly kafkaProducer: Producer,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async resetPassword(user: IUserModel) {
    const newPassword = generate({
      numbers: true,
    });
    const newUser = await this.userService.update(user.id, {
      ...user,
      password: newPassword,
    });
    await this.kafkaProducer.send({
      topic: `${tables.auth}.${requests.sendResetPasswordMsg}`,
      messages: [
        {
          value: JSON.stringify({ ...newUser, newPassword }),
        },
      ],
    });
    return newUser;
  }

  async login(user: IUserModel) {
    const accessToken = await this.generateToken({
      id: user.id,
      email: user.email,
    });
    const { id, email, firstName, lastName } = user;
    return {
      ...accessToken,
      profile: { id, email, firstName, lastName },
    };
  }

  async register(registerUserDto: IUserModel): Promise<User> {
    const newUser = await this.userService.create({
      ...registerUserDto,
      updatedBy: null,
    });
    return newUser;
  }

  async googleRegister(registerUser: IUserModel): Promise<User> {
    const newUser = await this.userService.create(registerUser);
    return newUser;
  }

  async googleLogin(user: IUserModel) {
    const accessToken = await this.generateToken({
      id: user.id,
      email: user.email,
    });
    const { id, email, firstName, lastName } = user;
    return {
      ...accessToken,
      profile: { id, email, firstName, lastName },
    };
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
