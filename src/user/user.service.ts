import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

// type googleUser = {
//   googleId?: string;
//   name: string;
//   photo: string;
//   email: string;
//   location: string;
// };
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>){}


  async create(createUserDto: Partial<User>) {
    const userEmail=createUserDto.email;
    const doesUserExists=await this.userRepository.findOne({where: {
      email:createUserDto.email ,
  },})
  console.log(doesUserExists)
    if(doesUserExists!==null){
      console.log("User Exists")
      console.log("Giving tokens")
      return ;
    }
    const user=this.userRepository.create(createUserDto as any)
    await this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
