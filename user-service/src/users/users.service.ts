import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hashPasswordHelper } from 'src/helpers/util';
import mongoose from 'mongoose';
import { compare } from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';

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

    // const user = await this.userModel.create({
    //   name: createUserDto.name,
    //   email: createUserDto.email,
    //   phone: createUserDto.phone,
    //   address: createUserDto.address,
    //   password: hashedPassword,
    //   role: 'admin',
    // });

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

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail (email: string) {
    return await this.userModel.findOne({email}).select('+password');
  }

  async update(id: String, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: id }, { $set: updateUserDto });
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.userModel.findById(userId).select('+password');
    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng.');
    }

    const isPasswordMatch = await compare(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException('Mật khẩu hiện tại không chính xác.');
    }

    const newHashedPassword = await hashPasswordHelper(changePasswordDto.newPassword);

    await this.userModel.updateOne(
      { _id: userId },
      { password: newHashedPassword },
    );

    return { message: 'Đổi mật khẩu thành công.' };
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
