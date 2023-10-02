import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionGroupsService } from '../useCases/permission-groups.service';
import { PermissionGroupsController } from '../controllers/permission-groups.controller';
import { PermissionGroup } from '../entities/permission-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionGroup])],
  controllers: [PermissionGroupsController],
  providers: [PermissionGroupsService],
  exports: [PermissionGroupsService],
})
export class PermissionGroupsModule {}
