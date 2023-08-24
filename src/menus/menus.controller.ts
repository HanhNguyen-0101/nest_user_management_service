import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { FilterMenuDto } from './dto/filter-menu.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @MessagePattern({ role: 'item', cmd: 'get_menus' })
  async findAll(@Payload() query: FilterMenuDto): Promise<any> {
    return await this.menusService.findAll(query);
  }

  @MessagePattern({ role: 'item', cmd: 'get_menu' })
  async findOne(@Payload() id: string): Promise<any> {
    const menu = await this.menusService.findOne(id);
    if (!menu) {
      return new HttpException('Menu does not exist!', HttpStatus.NOT_FOUND);
    } else {
      return menu;
    }
  }

  @MessagePattern({ role: 'item', cmd: 'get_menu_by_key' })
  async findOneByKey(@Payload() key: string): Promise<any> {
    const menu = await this.menusService.findOneByKey(key);
    if (!menu) {
      return new HttpException('Menu does not exist!', HttpStatus.NOT_FOUND);
    } else {
      return menu;
    }
  }

  @MessagePattern({ role: 'item', cmd: 'create_menu' })
  async create(@Payload() menu: CreateMenuDto): Promise<any> {
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

  @MessagePattern({ role: 'item', cmd: 'update_menu' })
  async update(@Payload() updateData): Promise<any> {
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

  @MessagePattern({ role: 'item', cmd: 'delete_menu' })
  async delete(@Payload() id: string): Promise<any> {
    const menu = await this.menusService.findOne(id);
    if (!menu) {
      return new HttpException('Menu does not exist!', HttpStatus.NOT_FOUND);
    }
    return await this.menusService.delete(id);
  }
}
