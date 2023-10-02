import { Controller } from '@nestjs/common';
import { UserRolesService } from '../useCases/user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { FilterUserRoleDto } from './dto/filter-user-role.dto';
import { FindCompositeKeyUserRoleDto } from './dto/find-composite-key-user-role.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { requestPatterns } from '../utils/constants';

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
