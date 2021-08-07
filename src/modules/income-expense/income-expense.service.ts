import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UserService } from '../user/user.service';
import { CreateIncomeExpenseDto } from './dto/create-income-expense.dto';
import { UpdateIncomeExpenseDto } from './dto/update-income-expense.dto';
import { IncomeExpense } from './entities/income-expense.entity';

@Injectable()
export class IncomeExpenseService {
  constructor(
    @InjectRepository(IncomeExpense)
    private incomeExpenseRepository: Repository<IncomeExpense>,
    private cloudinaryService: CloudinaryService,
    private userService: UserService,
  ) {}

  async create(
    createIncomeExpenseDto: CreateIncomeExpenseDto,
    userId: number,
    image: Express.Multer.File,
  ) {
    const imageUrl = await this.cloudinaryService.uploadImage(image);
    const incomeExpense = this.incomeExpenseRepository.create(
      createIncomeExpenseDto,
    );
    const user = await this.userService.findOne(userId);
    incomeExpense.image = imageUrl;
    incomeExpense.user = user;
    const inexdb = await this.incomeExpenseRepository.save(incomeExpense);
    const { user: userdb, ...rest } = inexdb;
    return rest;
  }

  findAll() {
    return this.incomeExpenseRepository.find();
  }

  findOne(id: number) {
    return this.incomeExpenseRepository.findOne(id);
  }

  async update(
    id: number,
    updateIncomeExpenseDto: UpdateIncomeExpenseDto,
    image: Express.Multer.File,
  ) {
    const incomeExpenseDB = await this.incomeExpenseRepository.findOne(id);
    if (image) {
      const url = await this.cloudinaryService.replaceImage(
        incomeExpenseDB.image,
        image,
      );
      console.log(url);
      if (url) {
        incomeExpenseDB.image = url;
      }
    }
    this.incomeExpenseRepository.merge(incomeExpenseDB, updateIncomeExpenseDto);
    return this.incomeExpenseRepository.save(incomeExpenseDB);
  }

  async remove(id: number) {
    const incomeExpense = await this.incomeExpenseRepository.findOne(id);
    await this.cloudinaryService.deleteImage(incomeExpense.image);
    return this.incomeExpenseRepository.delete(id);
  }
}
