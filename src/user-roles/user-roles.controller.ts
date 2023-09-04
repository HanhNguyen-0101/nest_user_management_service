import { Controller, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { FilterUserRoleDto } from './dto/filter-user-role.dto';
import { FindCompositeKeyUserRoleDto } from './dto/find-composite-key-user-role.dto';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { requestPatterns } from 'src/utils/constants';
import { HttpExceptionCustom } from 'src/utils/httpExceptionCustom';

const { tables, requests } = requestPatterns;
const { userRoles } = tables;
const { create, getAll, getOneById, remove, update } = requests;

@Controller('user-roles')
export class UserRolesController {
  constructor(
    private readonly userRolesService: UserRolesService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  @MessagePattern(`${userRoles}.${getAll}`)
  async findAll(@Payload() query: FilterUserRoleDto) {
    const result = await this.userRolesService.findAll(query);
    return JSON.stringify(result);
  }

  @MessagePattern(`${userRoles}.${getOneById}`)
  async findOne(@Payload() params: FindCompositeKeyUserRoleDto) {
    const userRole = await this.userRolesService.findOne(params);
    if (!userRole) {
      return new HttpExceptionCustom(
        'UserRole does not exist!',
        HttpStatus.BAD_REQUEST,
      ).toString();
    } else {
      return JSON.stringify(userRole);
    }
  }

  @MessagePattern(`${userRoles}.${create}`)
  async create(@Payload() createUserRoleDto: CreateUserRoleDto) {
    const { userId, roleId } = createUserRoleDto;
    const user = await this.usersService.findOne(userId);
    const role = await this.rolesService.findOne(roleId);
    if (!user) {
      return new HttpExceptionCustom(
        'UserID does not exist!',
        HttpStatus.BAD_REQUEST,
      ).toString();
    }
    if (!role) {
      return new HttpExceptionCustom(
        'RoleID does not exist!',
        HttpStatus.BAD_REQUEST,
      ).toString();
    }

    const userRoleExist = await this.userRolesService.findOne({
      user_id: userId,
      role_id: roleId,
    });
    if (userRoleExist) {
      return new HttpExceptionCustom(
        'UserRole was created!',
        HttpStatus.CONFLICT,
      ).toString();
    }

    const result = await this.userRolesService.create(createUserRoleDto);
    return JSON.stringify(result);
  }

  @MessagePattern(`${userRoles}.${update}`)
  async update(@Payload() updateData: { params; updateUserRoleDto }) {
    const { params, updateUserRoleDto } = updateData;
    const { userId, roleId } = updateUserRoleDto;
    const userRole = await this.userRolesService.findOne(params);
    if (!userRole) {
      return new HttpExceptionCustom(
        'UserRoleID does not exist!',
        HttpStatus.NOT_FOUND,
      ).toString();
    }
    if (roleId) {
      const role = await this.rolesService.findOne(updateUserRoleDto.roleId);
      if (!role) {
        return new HttpExceptionCustom(
          'RoleID does not exist!',
          HttpStatus.NOT_ACCEPTABLE,
        ).toString();
      }
    }
    if (userId) {
      const user = await this.usersService.findOne(updateUserRoleDto.userId);
      if (!user) {
        return new HttpExceptionCustom(
          'UserID does not exist!',
          HttpStatus.NOT_ACCEPTABLE,
        ).toString();
      }
    }

    const userRoleExist = await this.userRolesService.findOne({
      user_id: userId,
      role_id: roleId,
    });
    if (
      userRoleExist &&
      !(
        userRoleExist.userId === params.user_id &&
        userRoleExist.roleId === params.role_id
      )
    ) {
      return new HttpExceptionCustom(
        'UserRole was existed',
        HttpStatus.CONFLICT,
      ).toString();
    }

    const result = await this.userRolesService.update(
      params,
      updateUserRoleDto,
    );
    return JSON.stringify(result);
  }

  @MessagePattern(`${userRoles}.${remove}`)
  async delete(@Payload() params: FindCompositeKeyUserRoleDto) {
    const recordExist = await this.userRolesService.findOne(params);
    if (!recordExist) {
      return new HttpExceptionCustom(
        'Record does not exist!',
        HttpStatus.NOT_FOUND,
      ).toString();
    }
    const result = await this.userRolesService.delete(params);
    return JSON.stringify(result);
  }
}
