import { Inject, Module, OnModuleDestroy, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from 'kafkajs';
import { UsersService } from '../../application/use-cases';
import { UsersController } from '../../presentation/controllers';
import { User } from '../database/entities';
import { KafkaProducerProvider } from '../database/providers/kafka-producer.provider';
import { RolesModule } from './roles.module';
import { UserRolesModule } from './user-roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
    forwardRef(() => UserRolesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, KafkaProducerProvider],
  exports: [UsersService],
})
export class UsersModule implements OnModuleDestroy {
  constructor(
    @Inject('KafkaProducer')
    private readonly kafkaProducer: Producer,
  ) {}

  async onModuleDestroy(): Promise<void> {
    await this.kafkaProducer.disconnect();
  }
}
