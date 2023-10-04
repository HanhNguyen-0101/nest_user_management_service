import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateUserRoleDto,
  FilterUserRoleDto,
  FindCompositeKeyUserRoleDto,
} from '../models/userRole';
import { UserRolesService } from '../../application/use-cases';
import { requestPatterns } from '../../utils/constants';

const { tables, requests } = requestPatterns;
const { userRoles } = tables;
const { create, getAll, getOneById, remove, update } = requests;

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @MessagePattern(`${userRoles}.${getAll}`)
  async findAll(@Payload() query?: FilterUserRoleDto) {
    return await this.userRolesService.findAll(query);
  }

  @MessagePattern(`${userRoles}.${getOneById}`)
  async findOne(@Payload() params: FindCompositeKeyUserRoleDto) {
    return await this.userRolesService.findOne(params);
  }

  @MessagePattern(`${userRoles}.${create}`)
  async create(@Payload() createUserRoleDto: CreateUserRoleDto) {
    return await this.userRolesService.create(createUserRoleDto);
  }

  @MessagePattern(`${userRoles}.${update}`)
  async update(@Payload() updateData) {
    const { params, updateUserRoleDto } = updateData;
    return await this.userRolesService.update(params, updateUserRoleDto);
  }

  @MessagePattern(`${userRoles}.${remove}`)
  async delete(@Payload() params: FindCompositeKeyUserRoleDto) {
    return await this.userRolesService.delete(params);
  }
}
