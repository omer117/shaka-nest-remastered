import { Module } from '@nestjs/common';
import { ProductsModule } from './Products/Products.module';
import { OrdersModule } from './orders/orders.module';
import { DailyForecastModule } from './daily_forecast/daily_forecast.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeachesModule } from './beaches/beaches.module';
import { UsersModule } from './users/users.module';

require('dotenv').config();
let { PGURL, PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    DailyForecastModule,
    TypeOrmModule.forRoot({
      url: PGURL,
      type: 'postgres',
      host: PGHOST,
      port: 5432,
      username: PGUSER,
      password: PGPASSWORD,
      database: PGDATABASE,
      autoLoadEntities: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }),
    BeachesModule,
    UsersModule
  ],
})
export class AppModule { }
