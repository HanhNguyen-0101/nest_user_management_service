import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from '../core/dtos/permissionDto/create-permission.dto';
import { UpdatePermissionDto } from '../core/dtos/permissionDto/update-permission.dto';
import { FilterPermissionDto } from '../core/dtos/permissionDto/filter-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../core/entities';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async findAll(query?: FilterPermissionDto): Promise<any> {
    const page = query && query.page ? Number(query.page) : 1;
    const itemPerPage =
      query && query.item_per_page ? Number(query.item_per_page) : 10;
    const skip = (page - 1) * itemPerPage;
    const keyword = query && query.search ? query.search : '';

    const [res, total] = await this.permissionRepository.findAndCount({
      where: [
        { name: ILike(`%${keyword}%`) },
        { description: ILike(`%${keyword}%`) },
        { code: ILike(`%${keyword}%`) },
      ],
      order: { createdAt: 'DESC' },
      take: query && query.page && query.item_per_page ? itemPerPage : null,
      skip,
      relations: {
        rolePermissions: true,
        permissionGroup: true,
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

  async findOne(id: string): Promise<Permission> {
    return await this.permissionRepository.findOne({
      where: { id },
      relations: {
        rolePermissions: {
          role: true,
        },
        permissionGroup: true,
      },
    });
  }

  async findOneByName(name: string): Promise<Permission> {
    return await this.permissionRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return await this.permissionRepository.save(createPermissionDto);
  }

  async update(
    id: string,
    permission: UpdatePermissionDto,
  ): Promise<Permission> {
    await this.permissionRepository.update(id, permission);
    return await this.permissionRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<string> {
    await this.permissionRepository.delete(id);
    return `Deleted id=${id} successfully!`;
  }
}
