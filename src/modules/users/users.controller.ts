import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log("test: ", createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string,
  ) {
    // Convert string sang number và set giá trị mặc định
    const currentPage = current ? parseInt(current, 10) : 1;
    const size = pageSize ? parseInt(pageSize, 10) : 10;

    return this.usersService.findAll(query, currentPage, size);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
