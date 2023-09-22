import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { ILike, Repository } from 'typeorm';
import { FilterMenuDto } from './dto/filter-menu.dto';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async findAll(query: FilterMenuDto): Promise<any> {
    const page = Number(query.page) || 1;
    const itemPerPage = Number(query.item_per_page) || 10;
    const skip = (page - 1) * itemPerPage;
    const keyword = query.search || '';

    const [res, total] = await this.menuRepository.findAndCount({
      where: [{ name: ILike(`%${keyword}%`) }],
      order: { createdAt: 'DESC' },
      take: query.page && query.item_per_page ? itemPerPage : null,
      skip,
      relations: {
        parentMenu: true,
      },
    });

    const lastPage = Math.ceil(total / itemPerPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      prevPage,
    };
  }

  async findOne(id: string): Promise<Menu> {
    return await this.menuRepository.findOne({
      where: { id },
      relations: {
        parentMenu: true,
      },
    });
  }

  async findOneByKey(key: string): Promise<Menu> {
    return await this.menuRepository.findOneBy({ key });
  }

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    return await this.menuRepository.save(createMenuDto);
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    await this.menuRepository.update(id, updateMenuDto);
    return await this.menuRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<string> {
    await this.menuRepository.delete(id);
    return `Deleted id=${id} successfully!`;
  }
}
