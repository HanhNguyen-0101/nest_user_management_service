import { Controller, HttpStatus, HttpException } from '@nestjs/common';
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
    const rolePermission = await this.rolePermissionsService.findOne(params);
    if (!rolePermission) {
      return new HttpException(
        'rolePermission does not exist!',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return rolePermission;
    }
  }

  @MessagePattern(`${rolePermissions}.${create}`)
  async create(@Payload() createRolePermissionDto: CreateRolePermissionDto) {
    const { permissionId, roleId } = createRolePermissionDto;

    const permission = await this.permissionsService.findOne(permissionId);
    const role = await this.rolesService.findOne(roleId);
    if (!permission) {
      return new HttpException(
        'PermissionID does not exist!',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!role) {
      return new HttpException('RoleID does not exist!', HttpStatus.NOT_FOUND);
    }

    const rolePermissionExist = await this.rolePermissionsService.findOne({
      role_id: roleId,
      permission_id: permissionId,
    });

    if (rolePermissionExist) {
      return new HttpException(
        'RolePermission was created!',
        HttpStatus.CONFLICT,
      );
    }
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
    const { permissionId, roleId } = updateRolePermissionDto;

    const rolePermission = await this.rolePermissionsService.findOne(params);
    if (!rolePermission) {
      return new HttpException(
        'RolePermissionID does not exist!',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    if (roleId) {
      const role = await this.rolesService.findOne(roleId);
      if (!role) {
        return new HttpException(
          'RoleID does not exist!',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    }
    if (permissionId) {
      const permission = await this.permissionsService.findOne(permissionId);
      if (!permission) {
        return new HttpException(
          'PermissionID does not exist!',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    }

    const rolePermissionExist = await this.rolePermissionsService.findOne({
      permission_id: permissionId,
      role_id: roleId,
    });

    if (
      rolePermissionExist &&
      !(
        rolePermissionExist.permissionId === params.permission_id &&
        rolePermissionExist.roleId === params.role_id
      )
    ) {
      return new HttpException(
        'RolePermission was existed',
        HttpStatus.CONFLICT,
      );
    }

    return await this.rolePermissionsService.update(
      params,
      updateRolePermissionDto,
    );
  }

  @MessagePattern(`${rolePermissions}.${remove}`)
  async delete(@Payload() params: FindCompositeKeyRolePermissionDto) {
    const recordExist = await this.rolePermissionsService.findOne(params);
    if (!recordExist) {
      return new HttpException('Record does not exist!', HttpStatus.NOT_FOUND);
    }
    return await this.rolePermissionsService.delete(params);
  }
}
