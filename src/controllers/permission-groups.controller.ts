import { Controller } from '@nestjs/common';
import { PermissionGroupsService } from '../useCases/permission-groups.service';
import { CreatePermissionGroupDto } from '../core/dtos/permissionGroupDto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from '../core/dtos/permissionGroupDto/update-permission-group.dto';
import { FilterPermissionGroupDto } from '../core/dtos/permissionGroupDto/filter-permission-group.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { requestPatterns } from '../utils/constants';

const { tables, requests } = requestPatterns;
const { permissionGroups } = tables;
const { create, getAll, getOneById, remove, update, getOneByName } = requests;

@Controller('permission-groups')
export class PermissionGroupsController {
  constructor(
    private readonly permissionGroupsService: PermissionGroupsService,
  ) {}

  @MessagePattern(`${permissionGroups}.${getAll}`)
  async findAll(@Payload() query?: FilterPermissionGroupDto) {
    return await this.permissionGroupsService.findAll(query);
  }

  @MessagePattern(`${permissionGroups}.${getOneById}`)
  async findOne(@Payload() id: string) {
    return await this.permissionGroupsService.findOne(id);
  }

  @MessagePattern(`${permissionGroups}.${getOneByName}`)
  async findOneByName(@Payload() name: string) {
    return await this.permissionGroupsService.findOneByName(name);
  }

  @MessagePattern(`${permissionGroups}.${create}`)
  async create(@Payload() permissionGroup: CreatePermissionGroupDto) {
    return await this.permissionGroupsService.create(permissionGroup);
  }

  @MessagePattern(`${permissionGroups}.${update}`)
  async update(
    @Payload()
    updateData: {
      id: string;
      permissionGroup: UpdatePermissionGroupDto;
    },
  ) {
    const { id, permissionGroup } = updateData;
    return await this.permissionGroupsService.update(id, permissionGroup);
  }

  @MessagePattern(`${permissionGroups}.${remove}`)
  async delete(@Payload() id: string) {
    return await this.permissionGroupsService.delete(id);
  }
}
