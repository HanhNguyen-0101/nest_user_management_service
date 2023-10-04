import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UserRole } from '../../infrastructure/database/entities';
import {
  CreateUserRoleDto,
  FilterUserRoleDto,
  FindCompositeKeyUserRoleDto,
  UpdateUserRoleDto,
} from '../../presentation/models/userRole';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async findAll(query?: FilterUserRoleDto): Promise<any> {
    const page = query && query.page ? Number(query.page) : 1;
    const itemPerPage =
      query && query.item_per_page ? Number(query.item_per_page) : 10;
    const skip = (page - 1) * itemPerPage;

    const keyword = query && query.search ? query.search : '';
    const [res, total] = await this.userRoleRepository.findAndCount({
      where: [
        {
          user: [
            { email: ILike(`%${keyword}%`) },
            { firstName: ILike(`%${keyword}%`) },
            { lastName: ILike(`%${keyword}%`) },
          ],
        },
        {
          role: {
            name: ILike(`%${keyword}%`),
          },
        },
      ],
      order: { assignedAt: 'DESC' },
      take: query && query.page && query.item_per_page ? itemPerPage : null,
      skip,
      relations: {
        user: true,
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

  async findOne(params: FindCompositeKeyUserRoleDto): Promise<UserRole> {
    return await this.userRoleRepository.findOne({
      where: {
        userId: params.user_id,
        roleId: params.role_id,
      },
      relations: {
        user: true,
        role: true,
      },
    });
  }

  async create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    return await this.userRoleRepository.save(createUserRoleDto);
  }

  async update(
    params: FindCompositeKeyUserRoleDto,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRole> {
    const { userId, roleId } = updateUserRoleDto;
    await this.userRoleRepository.update(
      {
        roleId: params.role_id,
        userId: params.user_id,
      },
      updateUserRoleDto,
    );
    return await this.userRoleRepository.findOne({
      where: { roleId, userId },
    });
  }

  async delete(params: FindCompositeKeyUserRoleDto): Promise<string> {
    await this.userRoleRepository.delete({
      roleId: params.role_id,
      userId: params.user_id,
    });
    return `Deleted roleId=${params.role_id} & userId=${params.user_id} successfully!`;
  }
}
