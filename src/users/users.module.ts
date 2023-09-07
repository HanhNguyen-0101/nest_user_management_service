import { Module, Inject, OnModuleDestroy } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { KafkaProducerProvider } from 'src/providers/kafka-producer.provider';
import { Producer } from 'kafkajs';
import { UserRolesModule } from 'src/user-roles/user-roles.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule, UserRolesModule],
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
