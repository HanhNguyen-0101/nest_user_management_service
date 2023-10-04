import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RolesService } from '../../application/use-cases';
import { requestPatterns } from '../../utils/constants';
import { IFilterModel, IRoleModel } from '../models';

const { tables, requests } = requestPatterns;
const { roles } = tables;
const { create, getAll, getOneById, remove, update, getOneByName } = requests;

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern(`${roles}.${getAll}`)
  async findAll(@Payload() query?: IFilterModel) {
    return await this.rolesService.findAll(query);
  }

  @MessagePattern(`${roles}.${getOneById}`)
  async findOne(@Payload() id: string) {
    return await this.rolesService.findOne(id);
  }

  @MessagePattern(`${roles}.${getOneByName}`)
  async findOneByName(@Payload() name: string) {
    return await this.rolesService.findOneByName(name);
  }

  @MessagePattern(`${roles}.${create}`)
  async create(@Payload() role: IRoleModel) {
    return await this.rolesService.create(role);
  }

  @MessagePattern(`${roles}.${update}`)
  async update(@Payload() updateRole: { id: string; role: IRoleModel }) {
    const { id, role } = updateRole;
    return await this.rolesService.update(id, role);
  }

  @MessagePattern(`${roles}.${remove}`)
  async delete(@Payload() id: string) {
    return await this.rolesService.delete(id);
  }
}
