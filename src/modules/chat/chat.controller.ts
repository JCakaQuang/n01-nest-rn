import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChatsService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  create(@Body() dto: CreateChatDto) {
    return this.chatsService.create(dto);
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
    const currentPage = current ? parseInt(current, 10) : 1;
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    return this.chatsService.findAll(query, currentPage, size);
  }

  @Patch()
  update(@Body() dto: UpdateChatDto) {
    return this.chatsService.update(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(id);
  }
}
