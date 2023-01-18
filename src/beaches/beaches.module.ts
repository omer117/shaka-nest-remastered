import { Module } from '@nestjs/common';
import { BeachesService } from './beaches.service';
import { BeachesController } from './beaches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beaches } from './entities/beach.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Beaches])],
  controllers: [BeachesController],
  providers: [BeachesService]
})
export class BeachesModule {}
