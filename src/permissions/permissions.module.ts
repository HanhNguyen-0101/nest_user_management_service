import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission } from './entities/permission.entity';
import { PermissionGroup } from '../permission-groups/entities/permission-group.entity';
import { PermissionGroupsModule } from '../permission-groups/permission-groups.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, PermissionGroup]),
    PermissionGroupsModule,
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
