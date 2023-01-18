import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beaches } from './entities/beach.entity';

@Injectable()
export class BeachesService {
  constructor(@InjectRepository(Beaches) private beachesRepository: Repository<Beaches>) { }
  
  async findAll() {
    return await this.beachesRepository.find();
  }
}
