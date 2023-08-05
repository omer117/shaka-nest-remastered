import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { DailyForecastModule } from './daily_forecast/daily_forecast.module';
import { BeachesModule } from './beaches/beaches.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    url:'postgres://shaka_nxac_user:KneKPMHwl3Y4hsV8Nzxcm29XR6o4dFcT@dpg-citf3qp5rnuhcntnc98g-a.oregon-postgres.render.com/shaka_nxac',
    type:'postgres',
    host:'dpg-citf3qp5rnuhcntnc98g-a',
    port:5432,
    username:'shaka_nxac_user',
    password:'KneKPMHwl3Y4hsV8Nzxcm29XR6o4dFcT',
    database:'shaka_nxac',
    autoLoadEntities:true,
    synchronize:true,
    ssl:{
      rejectUnauthorized:false,
      
    }
  }),UsersModule,ProductsModule, 
  OrdersModule,
   DailyForecastModule, BeachesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
