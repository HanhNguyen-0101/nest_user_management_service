import { Module, Inject, OnModuleDestroy } from '@nestjs/common';
import { AuthService } from '../useCases/auth.service';
import { AuthController } from '../controllers';
import { UsersModule } from './users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../utils/constants';
import { User } from 'src/core/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesModule } from 'src/modules/user-roles.module';
import { RolesModule } from 'src/modules/roles.module';
import { KafkaProducerProvider } from 'src/frameworks/providers/kafka-producer.provider';
import { Producer } from 'kafkajs';

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
