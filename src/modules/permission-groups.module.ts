import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionGroupsService } from '../useCases/permission-groups.service';
import { PermissionGroupsController } from '../controllers';
import { PermissionGroup } from '../core/entities';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionGroup])],
  controllers: [PermissionGroupsController],
  providers: [PermissionGroupsService],
  exports: [PermissionGroupsService],
})
export class PermissionGroupsModule {}
