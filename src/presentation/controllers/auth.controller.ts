import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '../../application/use-cases';
import { requestPatterns } from '../../utils/constants';
import { RegisterUserDto } from '../view-models/auth';

const { tables, requests } = requestPatterns;
const { auth } = tables;
const { login, register, ggLogin, ggRegister, resetPassword } = requests;

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(`${auth}.${resetPassword}`)
  async resetPassword(@Payload() user: any) {
    return await this.authService.resetPassword(user);
  }

  @MessagePattern(`${auth}.${login}`)
  async login(@Payload() user: any) {
    return await this.authService.login(user);
  }

  @MessagePattern(`${auth}.${register}`)
  async register(@Payload() registerUser: RegisterUserDto) {
    return await this.authService.register(registerUser);
  }

  @MessagePattern(`${auth}.${ggRegister}`)
  async googleRegister(@Payload() user: any) {
    return await this.authService.googleRegister(user);
  }

  @MessagePattern(`${auth}.${ggLogin}`)
  async googleLogin(@Payload() user: any) {
    return await this.authService.googleLogin(user);
  }
}
