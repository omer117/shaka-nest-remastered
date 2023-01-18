import {IsDate, IsNotEmpty, IsString} from 'class-validator'

export class CreateDailyForecastDto {
    
    @IsString()
    @IsNotEmpty()
    wave_height: string
    
    @IsString()
    @IsNotEmpty()
    wind_direction: string
    
    @IsString()
    @IsNotEmpty()
    wind_speed: string
    
    @IsString()
    @IsNotEmpty()
    water_temperature: string
    
    @IsNotEmpty()
    last_updated: Date
    
    @IsString()
    @IsNotEmpty()
    beach_id: number
    
    @IsNotEmpty()
    @IsString()
    beach_name: string
}