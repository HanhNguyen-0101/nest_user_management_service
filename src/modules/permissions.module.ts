import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsService } from '../useCases';
import { PermissionsController } from '../controllers';
import { Permission } from '../core/entities';
import { PermissionGroup } from '../core/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, PermissionGroup])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
