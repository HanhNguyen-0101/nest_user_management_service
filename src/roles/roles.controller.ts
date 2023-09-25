import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FilterRoleDto } from './dto/filter-role.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { requestPatterns } from '../utils/constants';

const { tables, requests } = requestPatterns;
const { roles } = tables;
const { create, getAll, getOneById, remove, update, getOneByName } = requests;

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern(`${roles}.${getAll}`)
  async findAll(@Payload() query?: FilterRoleDto) {
    return await this.rolesService.findAll(query);
  }

  @MessagePattern(`${roles}.${getOneById}`)
  async findOne(@Payload() id: string) {
    return await this.rolesService.findOne(id);
  }

  @MessagePattern(`${roles}.${getOneByName}`)
  async findOneByName(@Payload() name: string) {
    return await this.rolesService.findOneByName(name);
  }

  @MessagePattern(`${roles}.${create}`)
  async create(@Payload() role: CreateRoleDto) {
    return await this.rolesService.create(role);
  }

  @MessagePattern(`${roles}.${update}`)
  async update(@Payload() updateRole: { id: string; role: UpdateRoleDto }) {
    const { id, role } = updateRole;
    return await this.rolesService.update(id, role);
  }

  @MessagePattern(`${roles}.${remove}`)
  async delete(@Payload() id: string) {
    return await this.rolesService.delete(id);
  }
}
