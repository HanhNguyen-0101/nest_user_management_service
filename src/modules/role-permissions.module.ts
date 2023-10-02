import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionsService } from '../useCases/role-permissions.service';
import { RolePermissionsController } from '../controllers';
import { RolePermission } from '../core/entities';
import { Role } from '../core/entities';
import { Permission } from '../core/entities';
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
