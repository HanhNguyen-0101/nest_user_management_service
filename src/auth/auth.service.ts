import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
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
    return newUser;
  }

  async googleRegister(registerUser): Promise<any> {
    const newUser = await this.userService.create(registerUser);
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
