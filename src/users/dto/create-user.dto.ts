import { isNotEmpty, IsNotEmpty, IsNumber, isNumber, IsString } from "class-validator";

export class CreateUserDto {

@IsNotEmpty()
@IsNumber()
user_id: number

@IsNotEmpty()
@IsString()
username:string

@IsNotEmpty()
@IsString()
email:string


@IsNotEmpty()
@IsString()
password:string
}
