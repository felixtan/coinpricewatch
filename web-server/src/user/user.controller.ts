import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from './user.service';
import { User } from '@prisma/client';

const saltOrRounds = 10;

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async signupUser(
    @Body() userData: { email: string; password: string },
  ): Promise<User> {
    const { email, password } = userData;
    return this.userService.createUser({
      email,
      password: await bcrypt.hash(password, saltOrRounds),
    });
  }

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    const user: User = await this.userService.user({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user: User = await this.userService.deleteUser({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
