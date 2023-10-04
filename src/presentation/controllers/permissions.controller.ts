import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PermissionsService } from '../../application/use-cases';
import { requestPatterns } from '../../utils/constants';
import { IFilterModel, IPermissionModel } from '../models';

const { tables, requests } = requestPatterns;
const { permissions } = tables;
const { create, getAll, getOneByName, getOneById, remove, update } = requests;

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @MessagePattern(`${permissions}.${getAll}`)
  async findAll(@Payload() query?: IFilterModel) {
    return await this.permissionsService.findAll(query);
  }

  @MessagePattern(`${permissions}.${getOneById}`)
  async findOne(@Payload() id: string) {
    return await this.permissionsService.findOne(id);
  }

  @MessagePattern(`${permissions}.${getOneByName}`)
  async findOneByName(@Payload() name: string) {
    return await this.permissionsService.findOneByName(name);
  }

  @MessagePattern(`${permissions}.${create}`)
  async create(@Payload() createPermissionDto: IPermissionModel) {
    return await this.permissionsService.create(createPermissionDto);
  }

  @MessagePattern(`${permissions}.${update}`)
  async update(
    @Payload()
    updateData: {
      id: string;
      permission: IPermissionModel;
    },
  ) {
    const { id, permission } = updateData;
    return await this.permissionsService.update(id, permission);
  }

  @MessagePattern(`${permissions}.${remove}`)
  async delete(@Payload() id: string) {
    return await this.permissionsService.delete(id);
  }
}
