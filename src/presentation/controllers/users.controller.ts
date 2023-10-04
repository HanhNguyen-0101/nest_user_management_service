import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateUserDto,
  FilterUserDto,
  UpdateUserDto,
} from '../models/user';
import { UsersService } from '../../application/use-cases';
import { requestPatterns } from '../../utils/constants';

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
