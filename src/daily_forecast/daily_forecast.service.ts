import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDailyForecastDto } from './dto/create-daily_forecast.dto';
import { DailyForecast } from './entities/daily_forecast.entity';

@Injectable()
export class DailyForecastService {
  constructor(@InjectRepository(DailyForecast) private DailyForecastRepository: Repository<DailyForecast>) { }

  async create(createDailyForecastDto: CreateDailyForecastDto): Promise<DailyForecast> {
    const { wave_height, wind_direction, wind_speed, water_temperature, last_updated, beach_id, beach_name } = createDailyForecastDto
    const forecast = this.DailyForecastRepository.create({
      wave_height,
      wind_direction,
      wind_speed,
      water_temperature,
      last_updated,
      beach_id,
      beach_name,
    })
    await this.DailyForecastRepository.save(forecast)
    return forecast;
  }

  async getForecastByBeachId(beach_id: number) {
    const found = await this.DailyForecastRepository.findOne({ where: { beach_id } })
    if (!found) {
      throw new NotFoundException("no forecast for that Beach" + beach_id)
    }
    return found
  }

  async remove(id: number) {
    const result = await this.DailyForecastRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Task did not deleted successfully')
    }
  }
}
