import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  getToken(data) {
    return {
      ...data,
      token: '11111111111',
    };
  }
}
