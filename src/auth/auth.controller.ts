import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { requestPatterns } from 'src/utils/constants';

const { tables, requests } = requestPatterns;
const { auth } = tables;
const { login, register, ggLogin, ggRegister } = requests;

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(`${auth}.${login}`)
  async login(@Payload() user: User) {
    return await this.authService.login(user);
  }

  @MessagePattern(`${auth}.${register}`)
  async register(@Payload() registerUser: RegisterUserDto) {
    return await this.authService.register(registerUser);
  }

  @MessagePattern(`${auth}.${ggRegister}`)
  async googleRegister(@Payload() user: User) {
    return await this.authService.googleRegister(user);
  }

  @MessagePattern(`${auth}.${ggLogin}`)
  async googleLogin(@Payload() user: User) {
    return await this.authService.googleLogin(user);
  }
}
