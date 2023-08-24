import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { FilterPermissionDto } from './dto/filter-permission.dto';
import { PermissionGroupsService } from '../permission-groups/permission-groups.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly permissionGroupService: PermissionGroupsService,
  ) {}

  @MessagePattern({ role: 'item', cmd: 'get_permissions' })
  async findAll(@Payload() query: FilterPermissionDto): Promise<any> {
    return await this.permissionsService.findAll(query);
  }

  @MessagePattern({ role: 'item', cmd: 'get_permission' })
  async findOne(@Payload() id: string): Promise<any> {
    const permission = await this.permissionsService.findOne(id);
    if (!permission) {
      return new HttpException(
        'Permission does not exist!',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return permission;
    }
  }

  @MessagePattern({ role: 'item', cmd: 'create_permission' })
  async create(
    @Payload() createPermissionDto: CreatePermissionDto,
  ): Promise<any> {
    const permissionGroup = await this.permissionGroupService.findOne(
      createPermissionDto.permissionGroupId,
    );
    if (!permissionGroup) {
      return new HttpException(
        'PermissionGroupID does not exist!',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const permissionExist = await this.permissionsService.findOneByName(
      createPermissionDto.name,
    );
    if (permissionExist) {
      return new HttpException('Name existed!', HttpStatus.CONFLICT);
    }
    return await this.permissionsService.create(createPermissionDto);
  }

  @MessagePattern({ role: 'item', cmd: 'update_permission' })
  async update(
    @Payload()
    updateData: {
      id: string;
      permission: UpdatePermissionDto;
    },
  ): Promise<any> {
    const { id, permission } = updateData;

    // Check Permission exist
    const permissionIdExist = await this.permissionsService.findOne(id);
    if (!permissionIdExist) {
      return new HttpException(
        'permission does not exist!',
        HttpStatus.NOT_FOUND,
      );
    }

    // Check permissionGroupId has existed in PermissionGroup
    if (permission.permissionGroupId) {
      const permissionGroup = await this.permissionGroupService.findOne(
        permission.permissionGroupId,
      );
      if (!permissionGroup) {
        return new HttpException(
          'PermissionGroupID does not exist!',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    }

    // Check Permission Name isn't dupplicate
    if (permission.name && permission.name !== permissionIdExist.name) {
      const permissionNameExist = await this.permissionsService.findOneByName(
        permission.name,
      );
      if (permissionNameExist) {
        return new HttpException('Name existed!', HttpStatus.CONFLICT);
      }
    }

    return await this.permissionsService.update(id, permission);
  }

  @MessagePattern({ role: 'item', cmd: 'delete_permission' })
  async delete(@Payload() id: string): Promise<any> {
    const permission = await this.permissionsService.findOne(id);
    if (!permission) {
      return new HttpException(
        'permission does not exist!',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.permissionsService.delete(id);
  }
}
