import { Controller } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { FilterRolePermissionDto } from './dto/filter-role-permission.dto';
import { FindCompositeKeyRolePermissionDto } from './dto/find-composite-key-role-permission.dto';
import { RolesService } from '../roles/roles.service';
import { PermissionsService } from '../permissions/permissions.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { requestPatterns } from 'src/utils/constants';

const { tables, requests } = requestPatterns;
const { rolePermissions } = tables;
const { create, getAll, getOneById, remove, update } = requests;

@Controller('role-permissions')
export class RolePermissionsController {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
    private readonly rolesService: RolesService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @MessagePattern(`${rolePermissions}.${getAll}`)
  async findAll(@Payload() query: FilterRolePermissionDto) {
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
