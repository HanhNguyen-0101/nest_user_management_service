import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesService } from '../useCases';
import { UserRolesController } from '../controllers';
import { UserRole } from '../core/entities';
import { User } from '../core/entities';
import { Role } from '../core/entities';
import { UsersModule } from './users.module';

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
