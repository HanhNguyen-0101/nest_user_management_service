import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { PermissionGroup } from '../../infrastructure/database/entities';
import {
  CreatePermissionGroupDto,
  FilterPermissionGroupDto,
  UpdatePermissionGroupDto,
} from '../../presentation/view-models/permissionGroup';

@Injectable()
export class PermissionGroupsService {
  constructor(
    @InjectRepository(PermissionGroup)
    private permissionGroupRepository: Repository<PermissionGroup>,
  ) {}
  async findAll(query?: FilterPermissionGroupDto): Promise<any> {
    const page = query && query.page ? Number(query.page) : 1;
    const itemPerPage =
      query && query.item_per_page ? Number(query.item_per_page) : 10;
    const skip = (page - 1) * itemPerPage;

    const keyword = query && query.search ? query.search : '';
    const [res, total] = await this.permissionGroupRepository.findAndCount({
      where: { name: ILike(`%${keyword}%`) },
      order: { createdAt: 'DESC' },
      take: query && query.page && query.item_per_page ? itemPerPage : null,
      skip,
      select: ['id', 'name', 'updatedAt', 'createdAt'],
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

  async findOne(id: string): Promise<PermissionGroup> {
    return await this.permissionGroupRepository.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<PermissionGroup> {
    return await this.permissionGroupRepository.findOne({
      where: {
        name,
      },
    });
  }

  async create(
    permissionGroup: CreatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    return await this.permissionGroupRepository.save(permissionGroup);
  }

  async update(
    id: string,
    permissionGroup: UpdatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    await this.permissionGroupRepository.update(id, permissionGroup);
    return await this.permissionGroupRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<string> {
    await this.permissionGroupRepository.delete(id);
    return `Deleted id=${id} successfully!`;
  }
}
