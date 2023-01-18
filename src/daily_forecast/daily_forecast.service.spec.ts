import { Test, TestingModule } from '@nestjs/testing';
import { DailyForecastService } from './daily_forecast.service';

describe('DailyForecastService', () => {
  let service: DailyForecastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyForecastService],
    }).compile();

    service = module.get<DailyForecastService>(DailyForecastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
