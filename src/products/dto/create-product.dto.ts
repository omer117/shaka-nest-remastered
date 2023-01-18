import { IsNotEmpty } from "class-validator";
import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateProductsDto {

    @IsString()
    @IsNotEmpty()
    catagory: string;

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsNumber()
    @IsNotEmpty()
    price: number;
    
    @IsString()
    @IsNotEmpty()
    info: string;
    
    @IsArray()
    @IsNotEmpty()
    sizes: string[];
    
    @IsString()
    @IsNotEmpty()
    image: string;
}