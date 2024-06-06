// users.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/configs/prisma.service';
import { Prisma, User } from '@prisma/client'; // Import User model from Prisma

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Unique constraint failed for email field
        throw new HttpException(
          'Email address is already taken',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.error('Error in create:', error);
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      console.error('Error in findOne:', error);
      throw new HttpException('User not foundssss', HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: number,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      console.error('Error in update:', error);
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<User> {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      console.error('Error in remove:', error);
      throw new HttpException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
