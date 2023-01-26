import { Body, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDailyForecastDto } from './dto/create-daily_forecast.dto';
import { DailyForecast } from './entities/daily_forecast.entity';
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom, map, Observable } from 'rxjs';
import axios, { AxiosError, AxiosHeaders } from 'axios';
import { Beaches } from './Beaches';
import { threadId } from 'worker_threads';

@Injectable()
export class DailyForecastService {
  constructor(@InjectRepository(DailyForecast)
  private DailyForecastRepository: Repository<DailyForecast>,
    private httpService: HttpService,

  ) { }

  async create(createDailyForecastDto: CreateDailyForecastDto): Promise<DailyForecast> {
    Logger.log(createDailyForecastDto);
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

  async update(id:number,req: any) {
    await this.DailyForecastRepository.delete({beach_id:id})
    const {wave_height,wind_direction,wind_speed,water_temperature,last_updated,beach_id,beach_name} = req;
    const newForecast = this.DailyForecastRepository.create({
        wave_height,wind_direction,wind_speed,water_temperature,last_updated,beach_id,beach_name
      }) 
      await this.DailyForecastRepository.save(newForecast)
      return newForecast
  }




  async weatherUpdateScript() {
    let startDate = new Date()
    let orgDate = startDate.getDate();
    let JSmonthFuckedUsAll = startDate.getMonth() + 1
    let fetchDate: String;
    if (JSmonthFuckedUsAll < 10) {
      fetchDate = (startDate.getFullYear() + '-' + '0' + (startDate.getMonth() + 1) + '-' + (startDate.getDate()))
    } else {
      fetchDate = (startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + (startDate.getDate()))
    }
    let newFetchEndDate = (startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + (startDate.getDate() + 1))

    const { data } = await firstValueFrom(
      this.httpService.get('http://localhost:9001/daily-forecast/1').pipe(
        catchError((error: AxiosError) => {
          Logger.log(error.response.data);
          throw "An error occurred"
        }),
      )
    )
    let lastDate = (Number(data.last_updated.substring(8, 10))+1);
    if (lastDate !== orgDate) {
      Beaches.forEach(async (beach) => {
        const { data } = await firstValueFrom(
          this.httpService.get('https://api.stormglass.io/v2/weather/point', {
            params: {
              'lat': (beach.lat),
              'lng': (beach.lon),
              'params': 'windSpeed,windDirection,waveHeight,waterTemperature',
              'start': JSON.stringify(fetchDate),
              'end': JSON.stringify(newFetchEndDate),
            },
            headers: {
              // 'Authorization': '78d8a20a-2318-11ed-8ab7-0242ac130002-78d8a2b4-2318-11ed-8ab7-0242ac130002'
              'Authorization': '8f33be36-3362-11ed-b970-0242ac130002-8f33be9a-3362-11ed-b970-0242ac130002'
            }
          }).pipe(
            catchError((error: AxiosError) => {
              Logger.log(error.response.data);
              throw "An error occurred"
            }),
          )
        )
        let Newforecast = (JSON.parse(JSON.stringify(data.hours[0])));
        axios.patch(`http://localhost:9001/daily-forecast/${beach.beach_id}`,
          {
            wave_height: Newforecast.waveHeight.icon,
            wind_direction: Newforecast.windDirection.icon,
            wind_speed: Newforecast.windSpeed.icon,
            water_temperature: Newforecast.waterTemperature.meto,
            last_updated: fetchDate,
            beach_id: beach.beach_id,
            beach_name: beach.beach_name
          }
        ).catch((err) => {
          console.log(err);
        })
          .then((res) => {
            console.log('updated successfully');
          })
      }
      )
    }else{
      return "no need to update";
    }
  }
}
