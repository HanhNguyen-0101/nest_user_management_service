import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusController } from '../../presentation/controllers';
import { Menu } from '../database/entities';
import { MenusService } from '../../application/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
