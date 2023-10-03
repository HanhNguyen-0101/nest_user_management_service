import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesService } from '../../application/use-cases';
import { UserRolesController } from '../../presentation/controllers';
import { UserRole } from '../database/entities';
import { User } from '../database/entities';
import { Role } from '../database/entities';
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
