import { Controller, HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FilterRoleDto } from './dto/filter-role.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { requestPatterns } from 'src/utils/constants';
import { HttpExceptionCustom } from 'src/utils/httpExceptionCustom';

const { tables, requests } = requestPatterns;
const { roles } = tables;
const { create, getAll, getOneById, remove, update, getOneByName } = requests;

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern(`${roles}.${getAll}`)
  async findAll(@Payload() query: FilterRoleDto) {
    const result = await this.rolesService.findAll(query);
    return JSON.stringify(result);
  }

  @MessagePattern(`${roles}.${getOneById}`)
  async findOne(@Payload() id: string) {
    const role = await this.rolesService.findOne(id);
    if (!role) {
      return new HttpExceptionCustom(
        'Role does not exist!',
        HttpStatus.BAD_REQUEST,
      ).toString();
    } else {
      return JSON.stringify(role);
    }
  }

  @MessagePattern(`${roles}.${getOneByName}`)
  async findOneByName(@Payload() name: string) {
    const role = await this.rolesService.findOneByName(name);
    if (!role) {
      return new HttpExceptionCustom(
        'Role does not exist!',
        HttpStatus.BAD_REQUEST,
      ).toString();
    }
    return JSON.stringify(role);
  }

  @MessagePattern(`${roles}.${create}`)
  async create(@Payload() role: CreateRoleDto) {
    const roleExist = await this.rolesService.findOneByName(role.name);
    if (roleExist) {
      return new HttpExceptionCustom(
        'Name existed!',
        HttpStatus.CONFLICT,
      ).toString();
    }

    const result = await this.rolesService.create(role);
    return JSON.stringify(result);
  }

  @MessagePattern(`${roles}.${update}`)
  async update(@Payload() updateRole: { id: string; role: UpdateRoleDto }) {
    const { id, role } = updateRole;
    const roleIdExist = await this.rolesService.findOne(id);
    if (!roleIdExist) {
      return new HttpExceptionCustom(
        'Role does not exist!',
        HttpStatus.BAD_REQUEST,
      ).toString();
    }
    if (role.name && role.name !== roleIdExist.name) {
      const roleNameExist = await this.rolesService.findOneByName(role.name);
      if (roleNameExist) {
        return new HttpExceptionCustom(
          'Name existed!',
          HttpStatus.CONFLICT,
        ).toString();
      }
    }
    const result = await this.rolesService.update(id, role);
    return JSON.stringify(result);
  }

  @MessagePattern(`${roles}.${remove}`)
  async delete(@Payload() id: string) {
    const role = await this.rolesService.findOne(id);
    if (!role) {
      return new HttpExceptionCustom(
        'Role does not exist!',
        HttpStatus.BAD_REQUEST,
      ).toString();
    }
    const result = await this.rolesService.delete(id);
    return JSON.stringify(result);
  }
}
