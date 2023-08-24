import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FilterRoleDto } from './dto/filter-role.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern({ role: 'item', cmd: 'get_roles' })
  async findAll(@Payload() query: FilterRoleDto): Promise<any> {
    return await this.rolesService.findAll(query);
  }

  @MessagePattern({ role: 'item', cmd: 'get_role' })
  async findOne(@Payload() id: string): Promise<any> {
    const role = await this.rolesService.findOne(id);
    if (!role) {
      return new HttpException('Role does not exist!', HttpStatus.BAD_REQUEST);
    } else {
      return role;
    }
  }

  @MessagePattern({ role: 'item', cmd: 'get_role_by_name' })
  async findOneByName(@Payload() name: string): Promise<any> {
    const role = await this.rolesService.findOneByName(name);
    if (!role) {
      return new HttpException('Role does not exist!', HttpStatus.BAD_REQUEST);
    }
    return role;
  }

  @MessagePattern({ role: 'item', cmd: 'create_role' })
  async create(@Payload() role: CreateRoleDto): Promise<any> {
    const roleExist = await this.rolesService.findOneByName(role.name);
    if (roleExist) {
      return new HttpException('Name existed!', HttpStatus.CONFLICT);
    }

    return await this.rolesService.create(role);
  }

  @MessagePattern({ role: 'item', cmd: 'update_role' })
  async update(
    @Payload() updateRole: { id: string; role: UpdateRoleDto },
  ): Promise<any> {
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

  @MessagePattern({ role: 'item', cmd: 'delete_role' })
  async delete(@Payload() id: string): Promise<any> {
    const role = await this.rolesService.findOne(id);
    if (!role) {
      return new HttpException('Role does not exist!', HttpStatus.BAD_REQUEST);
    }
    return await this.rolesService.delete(id);
  }
}
