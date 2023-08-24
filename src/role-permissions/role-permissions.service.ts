import { Injectable } from '@nestjs/common';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermission } from './entities/role-permission.entity';
import { Repository } from 'typeorm';
import { FilterRolePermissionDto } from './dto/filter-role-permission.dto';
import { FindCompositeKeyRolePermissionDto } from './dto/find-composite-key-role-permission.dto';

@Injectable()
export class RolePermissionsService {
  constructor(
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async findAll(query: FilterRolePermissionDto): Promise<any> {
    const page = Number(query.page) || 1;
    const itemPerPage = Number(query.item_per_page) || 10;
    const skip = (page - 1) * itemPerPage;

    const [res, total] = await this.rolePermissionRepository.findAndCount({
      take: itemPerPage,
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

  async findOne(
    params: FindCompositeKeyRolePermissionDto,
  ): Promise<RolePermission> {
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
    createRolePermissionDto: CreateRolePermissionDto,
  ): Promise<RolePermission> {
    return await this.rolePermissionRepository.save(createRolePermissionDto);
  }

  async update(
    params: FindCompositeKeyRolePermissionDto,
    updateRolePermissionDto: UpdateRolePermissionDto,
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

  async delete(params: FindCompositeKeyRolePermissionDto): Promise<string> {
    await this.rolePermissionRepository.delete({
      roleId: params.role_id,
      permissionId: params.permission_id,
    });
    return `Deleted roleId=${params.role_id} & permissionId=${params.permission_id} successfully!`;
  }
}
