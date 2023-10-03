import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionsService } from '../../application/use-cases';
import { RolePermissionsController } from '../../presentation/controllers';
import { RolePermission } from '../database/entities';
import { Role } from '../database/entities';
import { Permission } from '../database/entities';
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
