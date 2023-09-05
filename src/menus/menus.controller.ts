import { Controller, HttpStatus, HttpException } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { FilterMenuDto } from './dto/filter-menu.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { requestPatterns } from 'src/utils/constants';

const { tables, requests } = requestPatterns;
const { menu } = tables;
const { create, getAll, getOneById, remove, update, getOneByKey } = requests;

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @MessagePattern(`${menu}.${getAll}`)
  async findAll(@Payload() query: FilterMenuDto) {
    return await this.menusService.findAll(query);
  }

  @MessagePattern(`${menu}.${getOneById}`)
  async findOne(@Payload() id: string) {
    const menu = await this.menusService.findOne(id);
    if (!menu) {
      return new HttpException('Menu does not exist!', HttpStatus.NOT_FOUND);
    } else {
      return menu;
    }
  }

  @MessagePattern(`${menu}.${getOneByKey}`)
  async findOneByKey(@Payload() key: string) {
    const menu = await this.menusService.findOneByKey(key);
    if (!menu) {
      return new HttpException('Menu does not exist!', HttpStatus.NOT_FOUND);
    } else {
      return menu;
    }
  }

  @MessagePattern(`${menu}.${create}`)
  async create(@Payload() menu: CreateMenuDto) {
    const menuExist = await this.menusService.findOneByKey(menu.key);
    if (menuExist) {
      return new HttpException('Key existed!', HttpStatus.CONFLICT);
    }

    if (menu.parentId) {
      const menuParentExist = await this.menusService.findOne(menu.parentId);
      if (!menuParentExist) {
        return new HttpException(
          'MenuParent hasnt existed!',
          HttpStatus.CONFLICT,
        );
      }
    }

    return await this.menusService.create(menu);
  }

  @MessagePattern(`${menu}.${update}`)
  async update(@Payload() updateData) {
    const { id, menu } = updateData;
    const menuIdExist = await this.menusService.findOne(id);
    if (!menuIdExist) {
      return new HttpException('Menu does not exist!', HttpStatus.NOT_FOUND);
    }

    if (menu.key && menu.key !== menuIdExist.key) {
      const menuKeyExist = await this.menusService.findOneByKey(menu.key);
      if (menuKeyExist) {
        return new HttpException('Key existed!', HttpStatus.CONFLICT);
      }
    }
    if (menu.parentId) {
      const menuParentExist = await this.menusService.findOne(menu.parentId);
      if (!menuParentExist) {
        return new HttpException(
          'MenuParent hasnt existed!',
          HttpStatus.CONFLICT,
        );
      }
    }
    return await this.menusService.update(id, menu);
  }

  @MessagePattern(`${menu}.${remove}`)
  async delete(@Payload() id: string) {
    const menu = await this.menusService.findOne(id);
    if (!menu) {
      return new HttpException('Menu does not exist!', HttpStatus.NOT_FOUND);
    }
    return await this.menusService.delete(id);
  }
}
