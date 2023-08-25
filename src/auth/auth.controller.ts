import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from '../users/users.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @MessagePattern({ role: 'item', cmd: 'login' })
  async login(@Payload() user: User) {
    return await this.authService.login(user);
  }

  @MessagePattern({ role: 'item', cmd: 'register_google' })
  async registerGoogle(@Payload() user: User) {
    return await this.authService.registerGoogle(user);
  }

  @MessagePattern({ role: 'item', cmd: 'register' })
  async register(@Payload() registerUser: RegisterUserDto) {
    const user = await this.userService.findOneByEmail(registerUser.email);
    if (user) {
      return new HttpException('Email existed!', HttpStatus.CONFLICT);
    }
    return this.authService.register(registerUser);
  }

  @MessagePattern({ role: 'item', cmd: 'generate_token' })
  async getToken(@Payload() user: User) {
    return await this.authService.getToken(user);
  }
}
