import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionsService } from '../useCases/role-permissions.service';
import { RolePermissionsController } from '../controllers';
import { RolePermission } from '../core/entities/role-permission.entity';
import { Role } from '../core/entities/role.entity';
import { Permission } from '../core/entities/permission.entity';
import { RolesModule } from './roles.module';
import { PermissionsModule } from './permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolePermission, Role, Permission]),
    RolesModule,
    PermissionsModule,
  ],
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService],
})
export class RolePermissionsModule {}
