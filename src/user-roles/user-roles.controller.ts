import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { FilterUserRoleDto } from './dto/filter-user-role.dto';
import { FindCompositeKeyUserRoleDto } from './dto/find-composite-key-user-role.dto';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('user-roles')
export class UserRolesController {
  constructor(
    private readonly userRolesService: UserRolesService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  @MessagePattern({ role: 'item', cmd: 'get_userroles' })
  async findAll(@Payload() query: FilterUserRoleDto): Promise<any> {
    return await this.userRolesService.findAll(query);
  }

  @MessagePattern({ role: 'item', cmd: 'get_userrole' })
  async findOne(@Payload() params: FindCompositeKeyUserRoleDto): Promise<any> {
    const userRole = await this.userRolesService.findOne(params);
    if (!userRole) {
      return new HttpException(
        'UserRole does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return userRole;
    }
  }

  @MessagePattern({ role: 'item', cmd: 'create_userrole' })
  async create(@Payload() createUserRoleDto: CreateUserRoleDto): Promise<any> {
    const { userId, roleId } = createUserRoleDto;
    const user = await this.usersService.findOne(userId);
    const role = await this.rolesService.findOne(roleId);
    if (!user) {
      return new HttpException(
        'UserID does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!role) {
      return new HttpException(
        'RoleID does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userRoleExist = await this.userRolesService.findOne({
      user_id: userId,
      role_id: roleId,
    });
    if (userRoleExist) {
      return new HttpException('UserRole was created!', HttpStatus.CONFLICT);
    }

    return await this.userRolesService.create(createUserRoleDto);
  }

  @MessagePattern({ role: 'item', cmd: 'update_userrole' })
  async update(@Payload() updateData: { params; updateUserRoleDto }) {
    const { params, updateUserRoleDto } = updateData;
    const { userId, roleId } = updateUserRoleDto;
    const userRole = await this.userRolesService.findOne(params);
    if (!userRole) {
      return new HttpException(
        'UserRoleID does not exist!',
        HttpStatus.NOT_FOUND,
      );
    }
    if (roleId) {
      const role = await this.rolesService.findOne(updateUserRoleDto.roleId);
      if (!role) {
        return new HttpException(
          'RoleID does not exist!',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    }
    if (userId) {
      const user = await this.usersService.findOne(updateUserRoleDto.userId);
      if (!user) {
        return new HttpException(
          'UserID does not exist!',
          HttpStatus.NOT_ACCEPTABLE,
        );
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
      return new HttpException('UserRole was existed', HttpStatus.CONFLICT);
    }

    return await this.userRolesService.update(params, updateUserRoleDto);
  }

  @MessagePattern({ role: 'item', cmd: 'delete_userrole' })
  async delete(@Payload() params: FindCompositeKeyUserRoleDto): Promise<any> {
    const recordExist = await this.userRolesService.findOne(params);
    if (!recordExist) {
      return new HttpException('Record does not exist!', HttpStatus.NOT_FOUND);
    }
    return await this.userRolesService.delete(params);
  }
}
