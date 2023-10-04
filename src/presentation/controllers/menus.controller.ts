import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MenusService } from '../../application/use-cases';
import { requestPatterns } from '../../utils/constants';
import { IFilterModel, IMenuModel } from '../models';

const { tables, requests } = requestPatterns;
const { menu } = tables;
const { create, getAll, getOneById, remove, update, getOneByKey } = requests;

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @MessagePattern(`${menu}.${getAll}`)
  async findAll(@Payload() query?: IFilterModel) {
    return await this.menusService.findAll(query);
  }

  @MessagePattern(`${menu}.${getOneById}`)
  async findOne(@Payload() id: string) {
    return await this.menusService.findOne(id);
  }

  @MessagePattern(`${menu}.${getOneByKey}`)
  async findOneByKey(@Payload() key: string) {
    return await this.menusService.findOneByKey(key);
  }

  @MessagePattern(`${menu}.${create}`)
  async create(@Payload() createMenuDto: IMenuModel) {
    return await this.menusService.create(createMenuDto);
  }

  @MessagePattern(`${menu}.${update}`)
  async update(
    @Payload() updateData: { id: string; updateMenuDto: IMenuModel },
  ) {
    const { id, updateMenuDto } = updateData;
    return await this.menusService.update(id, updateMenuDto);
  }

  @MessagePattern(`${menu}.${remove}`)
  async delete(@Payload() id: string) {
    return await this.menusService.delete(id);
  }
}
