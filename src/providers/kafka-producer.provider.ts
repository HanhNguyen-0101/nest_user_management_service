import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { Producer } from 'kafkajs';
import { microservicesConstants } from '../utils/constants';

export const KafkaProducerProvider = {
  provide: 'KafkaProducer',
  useFactory: (): Promise<Producer> => {
    const kafkaClient = ClientProxyFactory.create({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: microservicesConstants.notification.BROKERS,
        },
        producer: {
          allowAutoTopicCreation: true,
        },
      },
    });

    return kafkaClient.connect();
  },
};
