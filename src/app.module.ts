import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './users/users.controller'; // Correct the import for your controller
import { User } from '././entities/user.entity'; // Correct import path for the User entity

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User], // Register the User entity here
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User]),  // Register the User repository here
  ],
  controllers: [UserController],  // Register the controller
  providers: [],
})
export class AppModule {}
