import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductsDto: CreateProductsDto) {
    return this.productsService.create(createProductsDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post('/getCatagoryFilteredByPrice')
  findByCatagoryFilter(@Body() req: any) {
    return this.productsService.findByCatagoryFilter(req);
  }

  @Post('/youMayLike')
  youMayLike(@Body() req: string) {
    return this.productsService.youMayLike(req);
  }

  @Post('/getCatagory')
  findByCatagory(@Body() catagory: string) {
    return this.productsService.findByCatagory(catagory);
  }

  @Get(':id')
  findByCatagoryAndId(@Param('id') product_id: number, @Body() _catagory: string) {
    return this.productsService.findOneById(product_id);
  }


  @Patch(':id')
  update(@Param('id') product_id: number, @Body() req: Object) {
    return this.productsService.update(product_id, req);
  }

  @Delete(':id')
  remove(@Param('id') product_id: number) {
    return this.productsService.remove(product_id);
  }
}
