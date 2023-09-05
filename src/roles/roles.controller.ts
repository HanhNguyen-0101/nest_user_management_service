import { Controller, HttpStatus, HttpException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FilterRoleDto } from './dto/filter-role.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { requestPatterns } from 'src/utils/constants';

const { tables, requests } = requestPatterns;
const { roles } = tables;
const { create, getAll, getOneById, remove, update, getOneByName } = requests;

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern(`${roles}.${getAll}`)
  async findAll(@Payload() query: FilterRoleDto) {
    return await this.rolesService.findAll(query);
  }

  @MessagePattern(`${roles}.${getOneById}`)
  async findOne(@Payload() id: string) {
    const role = await this.rolesService.findOne(id);
    if (!role) {
      return new HttpException('Role does not exist!', HttpStatus.BAD_REQUEST);
    } else {
      return role;
    }
  }

  @MessagePattern(`${roles}.${getOneByName}`)
  async findOneByName(@Payload() name: string) {
    const role = await this.rolesService.findOneByName(name);
    if (!role) {
      return new HttpException('Role does not exist!', HttpStatus.BAD_REQUEST);
    }
    return role;
  }

  @MessagePattern(`${roles}.${create}`)
  async create(@Payload() role: CreateRoleDto) {
    const roleExist = await this.rolesService.findOneByName(role.name);
    if (roleExist) {
      return new HttpException('Name existed!', HttpStatus.CONFLICT);
    }

    return await this.rolesService.create(role);
  }

  @MessagePattern(`${roles}.${update}`)
  async update(@Payload() updateRole: { id: string; role: UpdateRoleDto }) {
    const { id, role } = updateRole;
    const roleIdExist = await this.rolesService.findOne(id);
    if (!roleIdExist) {
      return new HttpException('Role does not exist!', HttpStatus.BAD_REQUEST);
    }
    if (role.name && role.name !== roleIdExist.name) {
      const roleNameExist = await this.rolesService.findOneByName(role.name);
      if (roleNameExist) {
        return new HttpException('Name existed!', HttpStatus.CONFLICT);
      }
    }
    return await this.rolesService.update(id, role);
  }

  @MessagePattern(`${roles}.${remove}`)
  async delete(@Payload() id: string) {
    const role = await this.rolesService.findOne(id);
    if (!role) {
      return new HttpException('Role does not exist!', HttpStatus.BAD_REQUEST);
    }
    return await this.rolesService.delete(id);
  }
}
