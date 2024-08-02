import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async findOne(username: string) {
    return await this.userRepository.findOneBy({username});
  }

  async createOne({ username, password }) {
    const newUser = { username, password };
    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }
}
