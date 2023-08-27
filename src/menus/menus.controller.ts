import { Controller, HttpStatus } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { FilterMenuDto } from './dto/filter-menu.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HttpExceptionCustom } from 'src/utils/httpExceptionCustom';
import { requestPatterns } from 'src/utils/constants';

const { tables, requests } = requestPatterns;
const { menu } = tables;
const { create, getAll, getOneById, remove, update, getOneByKey } = requests;

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @MessagePattern(`${menu}.${getAll}`)
  async findAll(@Payload() query: FilterMenuDto) {
    const result = await this.menusService.findAll(query);
    return JSON.stringify(result);
  }

  @MessagePattern(`${menu}.${getOneById}`)
  async findOne(@Payload() id: string) {
    const menu = await this.menusService.findOne(id);
    if (!menu) {
      return new HttpExceptionCustom(
        'Menu does not exist!',
        HttpStatus.NOT_FOUND,
      ).toString();
    } else {
      return JSON.stringify(menu);
    }
  }

  @MessagePattern(`${menu}.${getOneByKey}`)
  async findOneByKey(@Payload() key: string) {
    const menu = await this.menusService.findOneByKey(key);
    if (!menu) {
      return new HttpExceptionCustom(
        'Menu does not exist!',
        HttpStatus.NOT_FOUND,
      ).toString();
    } else {
      return JSON.stringify(menu);
    }
  }

  @MessagePattern(`${menu}.${create}`)
  async create(@Payload() menu: CreateMenuDto) {
    const menuExist = await this.menusService.findOneByKey(menu.key);
    if (menuExist) {
      return new HttpExceptionCustom(
        'Key existed!',
        HttpStatus.CONFLICT,
      ).toString();
    }

    if (menu.parentId) {
      const menuParentExist = await this.menusService.findOne(menu.parentId);
      if (!menuParentExist) {
        return new HttpExceptionCustom(
          'MenuParent hasnt existed!',
          HttpStatus.CONFLICT,
        ).toString();
      }
    }

    const result = await this.menusService.create(menu);
    return JSON.stringify(result);
  }

  @MessagePattern(`${menu}.${update}`)
  async update(@Payload() updateData) {
    const { id, menu } = updateData;
    const menuIdExist = await this.menusService.findOne(id);
    if (!menuIdExist) {
      return new HttpExceptionCustom(
        'Menu does not exist!',
        HttpStatus.NOT_FOUND,
      ).toString();
    }

    if (menu.key && menu.key !== menuIdExist.key) {
      const menuKeyExist = await this.menusService.findOneByKey(menu.key);
      if (menuKeyExist) {
        return new HttpExceptionCustom(
          'Key existed!',
          HttpStatus.CONFLICT,
        ).toString();
      }
    }
    if (menu.parentId) {
      const menuParentExist = await this.menusService.findOne(menu.parentId);
      if (!menuParentExist) {
        return new HttpExceptionCustom(
          'MenuParent hasnt existed!',
          HttpStatus.CONFLICT,
        ).toString();
      }
    }
    const result = await this.menusService.update(id, menu);
    return result;
  }

  @MessagePattern(`${menu}.${remove}`)
  async delete(@Payload() id: string) {
    const menu = await this.menusService.findOne(id);
    if (!menu) {
      return new HttpExceptionCustom(
        'Menu does not exist!',
        HttpStatus.NOT_FOUND,
      ).toString();
    }
    const result = await this.menusService.delete(id);
    return result;
  }
}
