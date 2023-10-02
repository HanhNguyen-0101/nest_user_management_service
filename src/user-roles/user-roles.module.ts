import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesService } from '../useCases/user-roles.service';
import { UserRolesController } from '../controllers/user-roles.controller';
import { UserRole } from '../core/entities/user-role.entity';
import { User } from '../core/entities/user.entity';
import { Role } from '../core/entities/role.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRole, User, Role]),
    forwardRef(() => UsersModule),
  ],
  controllers: [UserRolesController],
  providers: [UserRolesService],
  exports: [UserRolesService],
})
export class UserRolesModule {}
