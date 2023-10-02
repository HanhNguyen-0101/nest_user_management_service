import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { requestPatterns } from '../utils/constants';
import { CreateUserDto } from '../core/dtos/userDto/create-user.dto';
import { FilterUserDto } from '../core/dtos/userDto/filter-user.dto';
import { UpdateUserDto } from '../core/dtos/userDto/update-user.dto';
import { UsersService } from '../useCases';

const { tables, requests } = requestPatterns;
const { users } = tables;
const { create, getAll, getOneByEmail, getOneById, remove, update } = requests;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(`${users}.${getAll}`)
  async findAll(query?: FilterUserDto) {
    return await this.usersService.findAll(query);
  }

  @MessagePattern(`${users}.${getOneById}`)
  async findOne(id: string) {
    return await this.usersService.findOne(id);
  }

  @MessagePattern(`${users}.${getOneByEmail}`)
  async findOneByEmail(email: string) {
    return await this.usersService.findOneByEmail(email);
  }

  @MessagePattern(`${users}.${create}`)
  async create(user: CreateUserDto) {
    return await this.usersService.create(user);
  }

  @MessagePattern(`${users}.${update}`)
  async update(updateUser: { id: string; user: UpdateUserDto }) {
    return await this.usersService.update(updateUser.id, updateUser.user);
  }

  @MessagePattern(`${users}.${remove}`)
  async delete(id: string) {
    return await this.usersService.delete(id);
  }
}
