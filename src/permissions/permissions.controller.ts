import { Controller, HttpStatus } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { FilterPermissionDto } from './dto/filter-permission.dto';
import { PermissionGroupsService } from '../permission-groups/permission-groups.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { requestPatterns } from 'src/utils/constants';
import { HttpExceptionCustom } from 'src/utils/httpExceptionCustom';

const { tables, requests } = requestPatterns;
const { permissions } = tables;
const { create, getAll, getOneById, remove, update } = requests;

@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly permissionGroupService: PermissionGroupsService,
  ) {}

  @MessagePattern(`${permissions}.${getAll}`)
  async findAll(@Payload() query: FilterPermissionDto) {
    const result = await this.permissionsService.findAll(query);
    return JSON.stringify(result);
  }

  @MessagePattern(`${permissions}.${getOneById}`)
  async findOne(@Payload() id: string) {
    const permission = await this.permissionsService.findOne(id);
    if (!permission) {
      return new HttpExceptionCustom(
        'Permission does not exist!',
        HttpStatus.NOT_FOUND,
      ).toString();
    } else {
      return JSON.stringify(permission);
    }
  }

  @MessagePattern(`${permissions}.${create}`)
  async create(@Payload() createPermissionDto: CreatePermissionDto) {
    const permissionGroup = await this.permissionGroupService.findOne(
      createPermissionDto.permissionGroupId,
    );
    if (!permissionGroup) {
      return new HttpExceptionCustom(
        'PermissionGroupID does not exist!',
        HttpStatus.NOT_ACCEPTABLE,
      ).toString();
    }

    const permissionExist = await this.permissionsService.findOneByName(
      createPermissionDto.name,
    );
    if (permissionExist) {
      return new HttpExceptionCustom(
        'Name existed!',
        HttpStatus.CONFLICT,
      ).toString();
    }
    const result = await this.permissionsService.create(createPermissionDto);
    return JSON.stringify(result);
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

    // Check Permission exist
    const permissionIdExist = await this.permissionsService.findOne(id);
    if (!permissionIdExist) {
      return new HttpExceptionCustom(
        'permission does not exist!',
        HttpStatus.NOT_FOUND,
      ).toString();
    }

    // Check permissionGroupId has existed in PermissionGroup
    if (permission.permissionGroupId) {
      const permissionGroup = await this.permissionGroupService.findOne(
        permission.permissionGroupId,
      );
      if (!permissionGroup) {
        return new HttpExceptionCustom(
          'PermissionGroupID does not exist!',
          HttpStatus.NOT_ACCEPTABLE,
        ).toString();
      }
    }

    // Check Permission Name isn't dupplicate
    if (permission.name && permission.name !== permissionIdExist.name) {
      const permissionNameExist = await this.permissionsService.findOneByName(
        permission.name,
      );
      if (permissionNameExist) {
        return new HttpExceptionCustom(
          'Name existed!',
          HttpStatus.CONFLICT,
        ).toString();
      }
    }

    const result = await this.permissionsService.update(id, permission);
    return JSON.stringify(result);
  }

  @MessagePattern(`${permissions}.${remove}`)
  async delete(@Payload() id: string) {
    const permission = await this.permissionsService.findOne(id);
    if (!permission) {
      return new HttpExceptionCustom(
        'permission does not exist!',
        HttpStatus.NOT_FOUND,
      ).toString();
    }
    const result = await this.permissionsService.delete(id);
    return JSON.stringify(result);
  }
}
