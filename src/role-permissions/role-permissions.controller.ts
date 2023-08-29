import { Controller, HttpStatus } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { FilterRolePermissionDto } from './dto/filter-role-permission.dto';
import { FindCompositeKeyRolePermissionDto } from './dto/find-composite-key-role-permission.dto';
import { RolesService } from '../roles/roles.service';
import { PermissionsService } from '../permissions/permissions.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { requestPatterns } from 'src/utils/constants';
import { HttpExceptionCustom } from 'src/utils/httpExceptionCustom';

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
    const result = await this.rolePermissionsService.findAll(query);
    return JSON.stringify(result);
  }

  @MessagePattern(`${rolePermissions}.${getOneById}`)
  async findOne(
    @Payload()
    params: FindCompositeKeyRolePermissionDto,
  ) {
    const rolePermission = await this.rolePermissionsService.findOne(params);
    if (!rolePermission) {
      return new HttpExceptionCustom(
        'rolePermission does not exist!',
        HttpStatus.NOT_FOUND,
      ).toString();
    } else {
      return JSON.stringify(rolePermission);
    }
  }

  @MessagePattern(`${rolePermissions}.${create}`)
  async create(@Payload() createRolePermissionDto: CreateRolePermissionDto) {
    const { permissionId, roleId } = createRolePermissionDto;

    const permission = await this.permissionsService.findOne(permissionId);
    const role = await this.rolesService.findOne(roleId);
    if (!permission) {
      return new HttpExceptionCustom(
        'PermissionID does not exist!',
        HttpStatus.NOT_FOUND,
      ).toString();
    }
    if (!role) {
      return new HttpExceptionCustom(
        'RoleID does not exist!',
        HttpStatus.NOT_FOUND,
      ).toString();
    }

    const rolePermissionExist = await this.rolePermissionsService.findOne({
      role_id: roleId,
      permission_id: permissionId,
    });

    if (rolePermissionExist) {
      return new HttpExceptionCustom(
        'RolePermission was created!',
        HttpStatus.CONFLICT,
      ).toString();
    }
    const result = await this.rolePermissionsService.create(
      createRolePermissionDto,
    );
    return JSON.stringify(result);
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
      return new HttpExceptionCustom(
        'RolePermissionID does not exist!',
        HttpStatus.NOT_ACCEPTABLE,
      ).toString();
    }
    if (roleId) {
      const role = await this.rolesService.findOne(roleId);
      if (!role) {
        return new HttpExceptionCustom(
          'RoleID does not exist!',
          HttpStatus.NOT_ACCEPTABLE,
        ).toString();
      }
    }
    if (permissionId) {
      const permission = await this.permissionsService.findOne(permissionId);
      if (!permission) {
        return new HttpExceptionCustom(
          'PermissionID does not exist!',
          HttpStatus.NOT_ACCEPTABLE,
        ).toString();
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
      return new HttpExceptionCustom(
        'RolePermission was existed',
        HttpStatus.CONFLICT,
      ).toString();
    }

    const result = await this.rolePermissionsService.update(
      params,
      updateRolePermissionDto,
    );
    return JSON.stringify(result);
  }

  @MessagePattern(`${rolePermissions}.${remove}`)
  async delete(@Payload() params: FindCompositeKeyRolePermissionDto) {
    const recordExist = await this.rolePermissionsService.findOne(params);
    if (!recordExist) {
      return new HttpExceptionCustom(
        'Record does not exist!',
        HttpStatus.NOT_FOUND,
      ).toString();
    }
    const result = await this.rolePermissionsService.delete(params);
    return JSON.stringify(result);
  }
}
