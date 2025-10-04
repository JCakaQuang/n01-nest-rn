import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hashPasswordHelper } from 'src/helpers/util';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email });
    if (user) return true;
    return false;
  }

  async create(createUserDto: CreateUserDto) {
    const { name, email, phone, password, address } = createUserDto;

    //check email exist
    if (await this.isEmailExist(email)) {
      throw new BadRequestException('Email already exists: ' + email);
    }

    const hashedPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      name, email, phone, address,
      password: hashedPassword,
    });
    return {
      _id: user._id,
    }
  }
  async findAll(query: any, current: number = 1, pageSize: number = 10) {
    // Tạo bản sao query và xóa current, pageSize trước khi parse
    const { current: _, pageSize: __, ...queryWithoutPagination } = query;

    const aqp = (await import('api-query-params')).default;
    const { filter, sort } = aqp(queryWithoutPagination);

    const skip = (current - 1) * pageSize;
    const limit = pageSize;

    const results = await this.userModel
      .find(filter)
      .limit(limit)
      .skip(skip)
      .sort(sort as any);

    // Thêm total count cho pagination
    const total = await this.userModel.countDocuments(filter);

    return {
      data: results,
      meta: {
        current,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: updateUserDto._id }, { $set: { ...updateUserDto } });
  }

  async remove(_id: string) {
    //check id

    if (mongoose.isValidObjectId(_id)) {
      //delete
      return await this.userModel.deleteOne({ _id });
    }else{
      throw new BadRequestException('Invalid user ID: ' + _id);
    }
  }
}
