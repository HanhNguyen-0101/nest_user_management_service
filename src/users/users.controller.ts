import { Controller, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { HttpExceptionCustom } from 'src/utils/httpExceptionCustom';
import { requestPatterns } from 'src/utils/constants';

const { tables, requests } = requestPatterns;
const { users } = tables;
const { create, getAll, getOneByEmail, getOneById, remove, update } = requests;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(`${users}.${getAll}`)
  async findAll(query: FilterUserDto) {
    const users = await this.usersService.findAll(query);
    return JSON.stringify(users);
  }

  @MessagePattern(`${users}.${getOneById}`)
  async findOne(id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      return new HttpExceptionCustom(
        'User does not exist!',
        HttpStatus.BAD_REQUEST,
      ).toString();
    }
    return JSON.stringify(user);
  }

  @MessagePattern(`${users}.${getOneByEmail}`)
  async findOneByEmail(email: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return new HttpExceptionCustom(
        'User does not exist!',
        HttpStatus.BAD_REQUEST,
      ).toString();
    }
    return JSON.stringify(user);
  }

  @MessagePattern(`${users}.${create}`)
  async create(user: CreateUserDto): Promise<any> {
    const userExist = await this.usersService.findOneByEmail(user.email);
    if (userExist) {
      return new HttpExceptionCustom(
        'Email existed!',
        HttpStatus.CONFLICT,
      ).toString();
    }
    const newUser = await this.usersService.create(user);
    return JSON.stringify(newUser);
  }

  @MessagePattern(`${users}.${update}`)
  async update(updateUser: { id: string; user: UpdateUserDto }): Promise<any> {
    const userIdExist = await this.usersService.findOne(updateUser.id);
    if (!userIdExist) {
      return new HttpExceptionCustom(
        'User hasnt existed!',
        HttpStatus.NOT_ACCEPTABLE,
      ).toString();
    }

    if (updateUser.user.email && updateUser.user.email !== userIdExist.email) {
      const userEmailExist = await this.usersService.findOne(
        updateUser.user.email,
      );
      if (userEmailExist) {
        return new HttpExceptionCustom(
          'Email existed!',
          HttpStatus.CONFLICT,
        ).toString();
      }
    }

    const userUpdated = await this.usersService.update(
      updateUser.id,
      updateUser.user,
    );
    return JSON.stringify(userUpdated);
  }

  @MessagePattern(`${users}.${remove}`)
  async delete(id: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      return new HttpExceptionCustom(
        'User does not exist!',
        HttpStatus.BAD_REQUEST,
      ).toString();
    }
    const result = await this.usersService.delete(id);
    return JSON.stringify(result);
  }
}
