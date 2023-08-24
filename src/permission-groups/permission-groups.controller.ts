import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { PermissionGroupsService } from './permission-groups.service';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { FilterPermissionGroupDto } from './dto/filter-permission-group.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('permission-groups')
export class PermissionGroupsController {
  constructor(
    private readonly permissionGroupsService: PermissionGroupsService,
  ) {}

  @MessagePattern({ role: 'item', cmd: 'get_permission_groups' })
  async findAll(@Payload() query: FilterPermissionGroupDto): Promise<any> {
    return await this.permissionGroupsService.findAll(query);
  }

  @MessagePattern({ role: 'item', cmd: 'get_permission_group' })
  async findOne(@Payload() id: string): Promise<any> {
    const permissionGroup = await this.permissionGroupsService.findOne(id);
    if (!permissionGroup) {
      return new HttpException(
        'PermissionGroup does not exist!',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return permissionGroup;
    }
  }

  @MessagePattern({ role: 'item', cmd: 'create_permission_group' })
  async create(
    @Payload() permissionGroup: CreatePermissionGroupDto,
  ): Promise<any> {
    const permissionGroupExist =
      await this.permissionGroupsService.findOneByName(permissionGroup.name);
    if (permissionGroupExist) {
      return new HttpException('Name existed!', HttpStatus.CONFLICT);
    }

    return await this.permissionGroupsService.create(permissionGroup);
  }

  @MessagePattern({ role: 'item', cmd: 'update_permission_group' })
  async update(
    @Payload()
    updateData: {
      id: string;
      permissionGroup: UpdatePermissionGroupDto;
    },
  ): Promise<any> {
    const { id, permissionGroup } = updateData;
    const permissionGroupIdExist =
      await this.permissionGroupsService.findOne(id);
    if (!permissionGroupIdExist) {
      return new HttpException('Name existed!', HttpStatus.NOT_ACCEPTABLE);
    }

    if (
      permissionGroup.name &&
      permissionGroup.name !== permissionGroupIdExist.name
    ) {
      const permissionGroupNameExist =
        await this.permissionGroupsService.findOneByName(permissionGroup.name);
      if (permissionGroupNameExist) {
        return new HttpException('Name existed!', HttpStatus.CONFLICT);
      }
    }

    return await this.permissionGroupsService.update(id, permissionGroup);
  }

  @MessagePattern({ role: 'item', cmd: 'delete_permission_group' })
  async delete(@Payload() id: string): Promise<any> {
    const permissionGroup = await this.permissionGroupsService.findOne(id);
    if (!permissionGroup) {
      return new HttpException(
        'PermissionGroup does not exist!',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.permissionGroupsService.delete(id);
  }
}
