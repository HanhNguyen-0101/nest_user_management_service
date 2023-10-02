import { Controller } from '@nestjs/common';
import { AppService } from '../useCases/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
