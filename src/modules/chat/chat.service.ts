import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './schemas/chat.schema';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import mongoose from 'mongoose';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async create(dto: CreateChatDto) {
    // tạo tin nhắn mới
    const chat = await this.chatModel.create(dto);
    return { _id: chat._id };
  }

  async findAll(query: any, current = 1, pageSize = 10) {
    const { current: _, pageSize: __, ...queryWithoutPagination } = query;
    const aqp = (await import('api-query-params')).default;
    const { filter, sort } = aqp(queryWithoutPagination);
    const skip = (current - 1) * pageSize;

    const data = await this.chatModel.find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort(sort as any)
      .populate('sender_id', 'name email')
      .populate('receiver_id', 'name email');

    const total = await this.chatModel.countDocuments(filter);

    return {
      data,
      meta: {
        current,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async update(dto: UpdateChatDto) {
    if (!mongoose.isValidObjectId(dto._id)) {
      throw new BadRequestException('Invalid chat ID');
    }
    return await this.chatModel.updateOne({ _id: dto._id }, { $set: dto });
  }

  async remove(_id: string) {
    if (!mongoose.isValidObjectId(_id)) {
      throw new BadRequestException('Invalid chat ID');
    }
    return await this.chatModel.deleteOne({ _id });
  }
}
