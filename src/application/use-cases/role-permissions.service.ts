import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICompositeKeyRolePermission,
  IFilterModel,
  IGetAllRolePermission,
  IRolePermissionModel,
} from 'src/presentation/models';
import { Repository } from 'typeorm';
import { RolePermission } from '../../infrastructure/database/entities';

@Injectable()
export class RolePermissionsService {
  constructor(
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async findAll(query?: IFilterModel): Promise<IGetAllRolePermission> {
    const page = query && query.page ? Number(query.page) : 1;
    const itemPerPage =
      query && query.item_per_page ? Number(query.item_per_page) : 10;
    const skip = (page - 1) * itemPerPage;

    const [res, total] = await this.rolePermissionRepository.findAndCount({
      take: query && query.page && query.item_per_page ? itemPerPage : null,
      skip,
      relations: {
        permission: true,
        role: true,
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

  async findOne(params: ICompositeKeyRolePermission): Promise<RolePermission> {
    return await this.rolePermissionRepository.findOne({
      where: {
        roleId: params.role_id,
        permissionId: params.permission_id,
      },
      relations: {
        permission: true,
        role: true,
      },
    });
  }

  async create(
    createRolePermissionDto: IRolePermissionModel,
  ): Promise<RolePermission> {
    return await this.rolePermissionRepository.save(createRolePermissionDto);
  }

  async update(
    params: ICompositeKeyRolePermission,
    updateRolePermissionDto: IRolePermissionModel,
  ): Promise<RolePermission> {
    const { permissionId, roleId } = updateRolePermissionDto;

    await this.rolePermissionRepository.update(
      {
        roleId: params.role_id,
        permissionId: params.permission_id,
      },
      updateRolePermissionDto,
    );
    return await this.rolePermissionRepository.findOne({
      where: { permissionId, roleId },
    });
  }

  async delete(params: ICompositeKeyRolePermission): Promise<string> {
    await this.rolePermissionRepository.delete({
      roleId: params.role_id,
      permissionId: params.permission_id,
    });
    return `Deleted roleId=${params.role_id} & permissionId=${params.permission_id} successfully!`;
  }
}
