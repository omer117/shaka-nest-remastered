import {IsNotEmpty} from 'class-validator'

export class CreateOrderDto {

@IsNotEmpty()
items_purchased: any | null

// @IsNotEmpty()
purchase_date: Date;


user_id: number | null

}