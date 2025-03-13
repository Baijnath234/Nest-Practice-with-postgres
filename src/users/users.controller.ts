import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity'; 


@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Get()
  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @Get(":id")
  async findUserById(@Param('id') id: any): Promise<User> {
      try {
          const user = await this.userRepository.findOne({ where: { id } });
          if (!user) {
              throw new Error('User not found');
          }
          return user;
      } catch (error) {
          throw new Error(`Error finding user: ${error.message}`);
      }
  }
  
  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: any, @Body() user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return await this.userRepository.findOneById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: any): Promise<void> {
    await this.userRepository.delete(id);
  }
}

