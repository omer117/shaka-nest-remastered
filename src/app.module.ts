import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { DailyForecastModule } from './daily_forecast/daily_forecast.module';
import { BeachesModule } from './beaches/beaches.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    url:'postgres://shaka_nest_remastered_user:m6xl7ImkObYHstWtKsP4TdllkRHhPZP4@dpg-cf3fsmp4reb5o40npc20-a.frankfurt-postgres.render.com/shaka_nest_remastered',
    type:'postgres',
    host:'dpg-cf3fsmp4reb5o40npc20-a',
    port:5432,
    username:'shaka_nest_remastered_user',
    password:'m6xl7ImkObYHstWtKsP4TdllkRHhPZP4',
    database:'shaka_nest_remastered',
    autoLoadEntities:true,
    synchronize:true,
    ssl:{
      rejectUnauthorized:false,
      
    }
  }),ProductsModule, OrdersModule, DailyForecastModule, BeachesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
