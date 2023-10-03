import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionGroupsService } from '../../application/use-cases';
import { PermissionGroupsController } from '../../presentation/controllers';
import { PermissionGroup } from '../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionGroup])],
  controllers: [PermissionGroupsController],
  providers: [PermissionGroupsService],
  exports: [PermissionGroupsService],
})
export class PermissionGroupsModule {}
