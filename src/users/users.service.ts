import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private UserRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    const salt = 10;
    let { username, email, password } = createUserDto
    const hashedPass = await bcrypt.hash(password, salt)
    password = hashedPass.toString()
    const newUser = this.UserRepository.create({ username, email, password })
    await this.UserRepository.save(newUser)
    return newUser;
  }

  findAll() {
    return this.UserRepository.find();
  }

  findOne(id: string) {
    return this.UserRepository.findOne({ where: { user_id: id } });
  }

  remove(id: string) {
    return this.UserRepository.delete(id)
  }


  async validateUser(userDet: any) {
    const user = await this.UserRepository.findOne({ where: { username: userDet.username } })
    const isMatch = await bcrypt.compare(userDet.password,user.password)
    if(user && isMatch){
      const {username,user_id} =user
      return [user_id,username]
    }else{
      return "No User found"
    }
  }
}
