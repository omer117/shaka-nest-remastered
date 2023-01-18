import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { orders } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(orders) private ordersRepository: Repository<orders>) { }

  
  async create(createOrderDto: CreateOrderDto):Promise<orders> {
    const { items_purchased, purchase_date, user_id } = createOrderDto
    const order = this.ordersRepository.create({
      items_purchased, purchase_date,user_id
    })

    await this.ordersRepository.save(order)
    return order;
  }

  async deleteAll(){
    return await this.ordersRepository.createQueryBuilder().delete().from(orders).execute()
  }

  // findAll() {
  //   return `This action returns all orders`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }
}
