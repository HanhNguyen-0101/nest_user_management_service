import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from 'kafkajs';
import { AuthService } from '../../application/use-cases';
import { RolesModule } from '../../infrastructure/modules/roles.module';
import { UserRolesModule } from '../../infrastructure/modules/user-roles.module';
import { AuthController } from '../../presentation/controllers';
import { jwtConstants } from '../../utils/constants';
import { User } from '../database/entities';
import { KafkaProducerProvider } from '../database/providers/kafka-producer.provider';
import { UsersModule } from './users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    UserRolesModule,
    RolesModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, KafkaProducerProvider],
})
export class AuthModule implements OnModuleDestroy {
  constructor(
    @Inject('KafkaProducer')
    private readonly kafkaProducer: Producer,
  ) {}

  async onModuleDestroy(): Promise<void> {
    await this.kafkaProducer.disconnect();
  }
}
