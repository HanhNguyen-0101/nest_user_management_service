import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { microservicesConstants } from './utils/constants';

const { userManagement } = microservicesConstants;
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: userManagement.BROKERS,
        },
        consumer: {
          groupId: userManagement.GROUP_ID,
        },
      },
    },
  );
  await app.listen();
}

bootstrap();
