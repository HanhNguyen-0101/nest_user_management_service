import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from 'kafkajs';
import { KafkaProducerProvider } from 'src/frameworks/providers/kafka-producer.provider';
import { RolesModule } from 'src/modules/roles.module';
import { UserRolesModule } from 'src/modules/user-roles.module';
import { AuthController } from '../controllers';
import { User } from '../core/entities';
import { AuthService } from '../useCases/auth.service';
import { jwtConstants } from '../utils/constants';
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
