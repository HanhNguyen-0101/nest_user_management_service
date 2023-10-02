import { Module, Inject, OnModuleDestroy, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../useCases/users.service';
import { UsersController } from '../controllers/users.controller';
import { User } from '../core/entities/user.entity';
import { KafkaProducerProvider } from '../frameworks/providers/kafka-producer.provider';
import { Producer } from 'kafkajs';
import { UserRolesModule } from './user-roles.module';
import { RolesModule } from './roles.module';

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
