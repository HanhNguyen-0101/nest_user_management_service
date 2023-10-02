import { Controller } from '@nestjs/common';
import { AppService } from '../useCases';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
