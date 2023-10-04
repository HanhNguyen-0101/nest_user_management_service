import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RolePermissionsService } from '../../application/use-cases';
import { requestPatterns } from '../../utils/constants';
import {
  ICompositeKeyRolePermission,
  IFilterModel,
  IRolePermissionModel,
} from '../models';

const { tables, requests } = requestPatterns;
const { rolePermissions } = tables;
const { create, getAll, getOneById, remove, update } = requests;

@Controller('role-permissions')
export class RolePermissionsController {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
  ) {}

  @MessagePattern(`${rolePermissions}.${getAll}`)
  async findAll(@Payload() query?: IFilterModel) {
    return await this.rolePermissionsService.findAll(query);
  }

  @MessagePattern(`${rolePermissions}.${getOneById}`)
  async findOne(
    @Payload()
    params: ICompositeKeyRolePermission,
  ) {
    return await this.rolePermissionsService.findOne(params);
  }

  @MessagePattern(`${rolePermissions}.${create}`)
  async create(@Payload() createRolePermissionDto: IRolePermissionModel) {
    return await this.rolePermissionsService.create(createRolePermissionDto);
  }

  @MessagePattern(`${rolePermissions}.${update}`)
  async update(
    @Payload()
    updateData: {
      params: ICompositeKeyRolePermission;
      updateRolePermissionDto: IRolePermissionModel;
    },
  ) {
    const { params, updateRolePermissionDto } = updateData;
    return await this.rolePermissionsService.update(
      params,
      updateRolePermissionDto,
    );
  }

  @MessagePattern(`${rolePermissions}.${remove}`)
  async delete(@Payload() params: ICompositeKeyRolePermission) {
    return await this.rolePermissionsService.delete(params);
  }
}
