import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusController } from '../controllers';
import { Menu } from '../core/entities';
import { MenusService } from '../useCases';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
