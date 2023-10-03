import { Controller } from '@nestjs/common';
import { AppService } from '../../application/use-cases';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
