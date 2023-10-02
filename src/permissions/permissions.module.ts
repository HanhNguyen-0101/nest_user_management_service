import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsService } from '../useCases/permissions.service';
import { PermissionsController } from '../controllers/permissions.controller';
import { Permission } from '../core/entities/permission.entity';
import { PermissionGroup } from '../core/entities/permission-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, PermissionGroup])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
