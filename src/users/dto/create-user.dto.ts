import { isNotEmpty, IsNotEmpty, IsNumber, isNumber, IsString, IsUUID } from "class-validator";

export class CreateUserDto {

@IsNotEmpty()
@IsUUID()
user_id: string

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
