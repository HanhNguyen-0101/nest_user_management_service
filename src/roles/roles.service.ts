import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { ILike, Repository } from 'typeorm';
import { FilterRoleDto } from './dto/filter-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(query: FilterRoleDto): Promise<any> {
    const page = query.page ? Number(query.page) : 1;
    const itemPerPage = Number(query.item_per_page) || 10;
    const skip = (page - 1) * itemPerPage;
    const keyword = query.search || '';

    const [res, total] = await this.roleRepository.findAndCount({
      where: [
        { name: ILike(`%${keyword}%`) },
        { description: ILike(`%${keyword}%`) },
      ],
      order: { createdAt: 'DESC' },
      take: query.page && query.item_per_page ? itemPerPage : null,
      skip,
      relations: {
        updatedByUser: true,
        createdByUser: true,
        userRoles: true,
        rolePermissions: true,
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

  async findOne(id: string): Promise<Role> {
    return await this.roleRepository.findOne({
      where: { id },
      relations: {
        updatedByUser: true,
        createdByUser: true,
        userRoles: {
          user: true,
        },
        rolePermissions: {
          permission: true,
        },
      },
    });
  }

  async findOneByName(name: string): Promise<Role> {
    return await this.roleRepository.findOneBy({ name });
  }
  async create(role: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.save(role);
  }

  async update(id: string, role: UpdateRoleDto): Promise<Role> {
    await this.roleRepository.update(id, role);
    return await this.roleRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<string> {
    await this.roleRepository.delete(id);
    return `Deleted id=${id} successfully!`;
  }
}
