import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { UserRole } from './entities/user-role.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserRole, User, Role]),
    UsersModule,
    RolesModule,
  ],
  controllers: [UserRolesController],
  providers: [UserRolesService],
})
export class UserRolesModule {}
