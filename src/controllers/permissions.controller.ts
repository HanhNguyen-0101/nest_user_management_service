import { Controller } from '@nestjs/common';
import { PermissionsService } from '../useCases/permissions.service';
import { CreatePermissionDto } from '../core/dtos/permissionDto/create-permission.dto';
import { UpdatePermissionDto } from '../core/dtos/permissionDto/update-permission.dto';
import { FilterPermissionDto } from '../core/dtos/permissionDto/filter-permission.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { requestPatterns } from '../utils/constants';

const { tables, requests } = requestPatterns;
const { permissions } = tables;
const { create, getAll, getOneByName, getOneById, remove, update } = requests;

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @MessagePattern(`${permissions}.${getAll}`)
  async findAll(@Payload() query?: FilterPermissionDto) {
    return await this.permissionsService.findAll(query);
  }

  @MessagePattern(`${permissions}.${getOneById}`)
  async findOne(@Payload() id: string) {
    return await this.permissionsService.findOne(id);
  }

  @MessagePattern(`${permissions}.${getOneByName}`)
  async findOneByName(@Payload() name: string) {
    return await this.permissionsService.findOneByName(name);
  }

  @MessagePattern(`${permissions}.${create}`)
  async create(@Payload() createPermissionDto: CreatePermissionDto) {
    return await this.permissionsService.create(createPermissionDto);
  }

  @MessagePattern(`${permissions}.${update}`)
  async update(
    @Payload()
    updateData: {
      id: string;
      permission: UpdatePermissionDto;
    },
  ) {
    const { id, permission } = updateData;
    return await this.permissionsService.update(id, permission);
  }

  @MessagePattern(`${permissions}.${remove}`)
  async delete(@Payload() id: string) {
    return await this.permissionsService.delete(id);
  }
}
