import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from '../users/users.service';
import { HttpExceptionCustom } from 'src/utils/httpExceptionCustom';
import { requestPatterns } from 'src/utils/constants';

const { tables, requests } = requestPatterns;
const { auth } = tables;
const { login, register, ggLogin, ggRegister } = requests;


@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @MessagePattern(`${auth}.${login}`)
  async login(@Payload() user: User) {
    const result = await this.authService.login(user);
    return JSON.stringify(result);
  }

  @MessagePattern(`${auth}.${register}`)
  async register(@Payload() registerUser: RegisterUserDto) {
    const user = await this.userService.findOneByEmail(registerUser.email);
    if (user) {
      return new HttpExceptionCustom(
        'Email existed!',
        HttpStatus.CONFLICT,
      ).toString();
    }
    const newUser = await this.authService.register(registerUser);
    return JSON.stringify(newUser);
  }

  @MessagePattern(`${auth}.${ggRegister}`)
  async googleRegister(@Payload() user: User) {
    const newUser = await this.authService.googleRegister(user);
    return JSON.stringify(newUser);
  }

  @MessagePattern(`${auth}.${ggLogin}`)
  async googleLogin(@Payload() user: User) {
    const result = await this.authService.googleLogin(user);
    return JSON.stringify(result);
  }
}
