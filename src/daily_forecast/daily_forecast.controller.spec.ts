import { Test, TestingModule } from '@nestjs/testing';
import { DailyForecastController } from './daily_forecast.controller';
import { DailyForecastService } from './daily_forecast.service';

describe('DailyForecastController', () => {
  let controller: DailyForecastController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyForecastController],
      providers: [DailyForecastService],
    }).compile();

    controller = module.get<DailyForecastController>(DailyForecastController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
