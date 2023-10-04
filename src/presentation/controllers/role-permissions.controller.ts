import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateRolePermissionDto,
  FilterRolePermissionDto,
  FindCompositeKeyRolePermissionDto,
  UpdateRolePermissionDto,
} from '../models/rolePermission';
import { RolePermissionsService } from '../../application/use-cases';
import { requestPatterns } from '../../utils/constants';

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
