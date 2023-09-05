import { Controller, HttpStatus, HttpException } from '@nestjs/common';
import { PermissionGroupsService } from './permission-groups.service';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { FilterPermissionGroupDto } from './dto/filter-permission-group.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { requestPatterns } from 'src/utils/constants';

const { tables, requests } = requestPatterns;
const { permissionGroups } = tables;
const { create, getAll, getOneById, remove, update } = requests;

@Controller('permission-groups')
export class PermissionGroupsController {
  constructor(
    private readonly permissionGroupsService: PermissionGroupsService,
  ) {}

  @MessagePattern(`${permissionGroups}.${getAll}`)
  async findAll(@Payload() query: FilterPermissionGroupDto) {
    return await this.permissionGroupsService.findAll(query);
  }

  @MessagePattern(`${permissionGroups}.${getOneById}`)
  async findOne(@Payload() id: string) {
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

  @MessagePattern(`${permissionGroups}.${create}`)
  async create(@Payload() permissionGroup: CreatePermissionGroupDto) {
    const permissionGroupExist =
      await this.permissionGroupsService.findOneByName(permissionGroup.name);
    if (permissionGroupExist) {
      return new HttpException('Name existed!', HttpStatus.CONFLICT);
    }

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

  @MessagePattern(`${permissionGroups}.${remove}`)
  async delete(@Payload() id: string) {
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
