import { Controller, Get } from '@nestjs/common';
import { BeachesService } from './beaches.service';

@Controller('beaches')
export class BeachesController {
  constructor(private readonly beachesService: BeachesService) {}

  @Get()
  findAll() {
    return this.beachesService.findAll();
  }
}
