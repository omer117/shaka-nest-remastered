
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DailyForecast {
@PrimaryGeneratedColumn()
forecast_id:number;

@Column({nullable: true})
wave_height:string | null;

@Column({nullable: true})
wind_direction:string;

@Column({ nullable: true })
wind_speed:string;

@Column({ nullable: true })
water_temperature:string;

@Column({ nullable: true })
last_updated:Date;

@Column({ nullable: true })
beach_id: number;

@Column({ nullable: true })
beach_name:string;
}