import { Module } from '@nestjs/common';
import { DailyForecastService } from './daily_forecast.service';
import { DailyForecastController } from './daily_forecast.controller';
import { DailyForecast } from './entities/daily_forecast.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([DailyForecast])],
  controllers: [DailyForecastController],
  providers: [DailyForecastService]
})
export class DailyForecastModule {}
