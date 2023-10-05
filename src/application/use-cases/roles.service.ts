import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFilterModel, IGetAllRole, IRoleModel } from '../../presentation/models';
import { ILike, Repository } from 'typeorm';
import { Role } from '../../infrastructure/database/entities';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(query?: IFilterModel): Promise<IGetAllRole> {
    const page = query && query.page ? Number(query.page) : 1;
    const itemPerPage =
      query && query.item_per_page ? Number(query.item_per_page) : 10;
    const skip = (page - 1) * itemPerPage;
    const keyword = query && query.search ? query.search : '';

    const [res, total] = await this.roleRepository.findAndCount({
      where: [
        { name: ILike(`%${keyword}%`) },
        { description: ILike(`%${keyword}%`) },
      ],
      order: { createdAt: 'DESC' },
      take: query && query.page && query.item_per_page ? itemPerPage : null,
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
  async create(role: IRoleModel): Promise<Role> {
    return await this.roleRepository.save(role);
  }

  async update(id: string, role: IRoleModel): Promise<Role> {
    await this.roleRepository.update(id, role);
    return await this.roleRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<string> {
    await this.roleRepository.delete(id);
    return `Deleted id=${id} successfully!`;
  }
}
