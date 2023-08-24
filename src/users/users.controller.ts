import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ role: 'item', cmd: 'get_users' })
  async findAll(query: FilterUserDto): Promise<any> {
    return this.usersService.findAll(query);
  }

  @MessagePattern({ role: 'item', cmd: 'get_user' })
  async findOne(id: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      return new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @MessagePattern({ role: 'item', cmd: 'get_user_by_email' })
  async findOneByEmail(email: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @MessagePattern({ role: 'item', cmd: 'create_user' })
  async create(user: CreateUserDto): Promise<any> {
    const userExist = await this.usersService.findOneByEmail(user.email);
    if (userExist) {
      return new HttpException('Email existed!', HttpStatus.CONFLICT);
    }
    return this.usersService.create(user);
  }

  @MessagePattern({ role: 'item', cmd: 'update_user' })
  async update(updateUser: { id: string; user: UpdateUserDto }): Promise<any> {
    const userIdExist = await this.usersService.findOne(updateUser.id);
    if (!userIdExist) {
      return new HttpException(
        'User hasnt existed!',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    if (updateUser.user.email && updateUser.user.email !== userIdExist.email) {
      const userEmailExist = await this.usersService.findOne(
        updateUser.user.email,
      );
      if (userEmailExist) {
        return new HttpException('Email existed!', HttpStatus.CONFLICT);
      }
    }

    return this.usersService.update(updateUser.id, updateUser.user);
  }

  @MessagePattern({ role: 'item', cmd: 'delete_user' })
  async delete(id: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      return new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.delete(id);
  }
}
