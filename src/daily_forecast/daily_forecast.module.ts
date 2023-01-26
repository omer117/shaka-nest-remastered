import { Module } from '@nestjs/common';
import { DailyForecastService } from './daily_forecast.service';
import { DailyForecastController } from './daily_forecast.controller';
import { DailyForecast } from './entities/daily_forecast.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[TypeOrmModule.forFeature([DailyForecast]),HttpModule],
  controllers: [DailyForecastController],
  providers: [DailyForecastService]
})
export class DailyForecastModule {}
