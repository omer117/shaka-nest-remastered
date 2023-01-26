import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { getegid } from 'process';
import { DailyForecastService } from './daily_forecast.service';
import { CreateDailyForecastDto } from './dto/create-daily_forecast.dto';


@Controller('daily-forecast')
export class DailyForecastController {
  constructor(private readonly dailyForecastService: DailyForecastService) { }

  @Post()
  create(@Body() createDailyForecastDto: CreateDailyForecastDto) {
    return this.dailyForecastService.create(createDailyForecastDto);
  }

  @Get(':id')
  findOneById(@Param('id') beach_id: number) {
    return this.dailyForecastService.getForecastByBeachId(beach_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyForecastService.remove(+id);
  }

  @Get()
  updater(){
    return this.dailyForecastService.weatherUpdateScript();
  }

  @Patch(':id')
  updateForecast(@Param('id') id:number, @Body() req:any){
    this.dailyForecastService.update(id, req);
  }
}
