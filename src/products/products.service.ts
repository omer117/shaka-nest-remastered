import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Filter } from 'sharedTypes_shaka/utils-&-shared-types/enums';
import { Repository } from 'typeorm';
import { CreateProductsDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>){}

  async create(createProductDto: CreateProductsDto):Promise<Product> {
    const { catagory, title, price, info, sizes, image } = createProductDto
    const Product = this.productRepository.create({
      catagory, title, price, info, sizes, image
    })

    await this.productRepository.save(Product)
    return Product
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }



  async findByCatagoryFilter(req: any) {
    let priceFilter: Filter = req.filter
    Logger.log(req)
    const result = await
      this.productRepository.createQueryBuilder()
        .where('catagory = :catagory', { catagory: req.catagory })
        .orderBy({ "price": `${priceFilter}` })
        .getRawMany()
    return result;
  }

  async findByCatagory(req: any): Promise<Product[]> {
    const result = await
      this.productRepository.createQueryBuilder()
        .where('catagory = :catagory', { catagory: req.catagory })
        .getRawMany()
    return result;
  }

  async youMayLike(req): Promise<Product[]> {
    const result = await
      this.productRepository.createQueryBuilder()
        .where('catagory = :catagory', { catagory: req.catagory })
        .orderBy({ "price": 'DESC' })
        .limit(3)
        .getRawMany()

    return result
  }

  async findOneById(product_id: any) {
    Logger.log(product_id)
    const found = await this.productRepository.findOne({ where: { product_id } })
    return found
  }



  async update(product_id: number, req: any) {

    const { catagory, title, price, info, sizes, image } = req
    const Product =
      this.productRepository.create({
        catagory, title, price, info, sizes, image
      })

    this.productRepository.delete(product_id)
    await this.productRepository.save(Product)
    return Product
  }

  remove(product_id: number) {
    return this.productRepository.delete(product_id)
  }
}
