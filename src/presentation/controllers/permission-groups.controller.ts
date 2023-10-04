import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreatePermissionGroupDto,
  FilterPermissionGroupDto,
  UpdatePermissionGroupDto,
} from '../models/permissionGroup';
import { PermissionGroupsService } from '../../application/use-cases';
import { requestPatterns } from '../../utils/constants';

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
