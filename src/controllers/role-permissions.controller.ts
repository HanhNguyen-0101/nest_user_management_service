import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { requestPatterns } from '../utils/constants';
import { CreateRolePermissionDto } from '../core/dtos/rolePermissionDto/create-role-permission.dto';
import { FilterRolePermissionDto } from '../core/dtos/rolePermissionDto/filter-role-permission.dto';
import { FindCompositeKeyRolePermissionDto } from '../core/dtos/rolePermissionDto/find-composite-key-role-permission.dto';
import { UpdateRolePermissionDto } from '../core/dtos/rolePermissionDto/update-role-permission.dto';
import { RolePermissionsService } from '../useCases';

const { tables, requests } = requestPatterns;
const { rolePermissions } = tables;
const { create, getAll, getOneById, remove, update } = requests;

@Controller('role-permissions')
export class RolePermissionsController {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
  ) {}

  @MessagePattern(`${rolePermissions}.${getAll}`)
  async findAll(@Payload() query?: FilterRolePermissionDto) {
    return await this.rolePermissionsService.findAll(query);
  }

  @MessagePattern(`${rolePermissions}.${getOneById}`)
  async findOne(
    @Payload()
    params: FindCompositeKeyRolePermissionDto,
  ) {
    return await this.rolePermissionsService.findOne(params);
  }

  @MessagePattern(`${rolePermissions}.${create}`)
  async create(@Payload() createRolePermissionDto: CreateRolePermissionDto) {
    return await this.rolePermissionsService.create(createRolePermissionDto);
  }

  @MessagePattern(`${rolePermissions}.${update}`)
  async update(
    @Payload()
    updateData: {
      params: FindCompositeKeyRolePermissionDto;
      updateRolePermissionDto: UpdateRolePermissionDto;
    },
  ) {
    const { params, updateRolePermissionDto } = updateData;
    return await this.rolePermissionsService.update(
      params,
      updateRolePermissionDto,
    );
  }

  @MessagePattern(`${rolePermissions}.${remove}`)
  async delete(@Payload() params: FindCompositeKeyRolePermissionDto) {
    return await this.rolePermissionsService.delete(params);
  }
}
