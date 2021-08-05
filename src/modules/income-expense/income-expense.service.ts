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
    return `This action returns a #${id} incomeExpense`;
  }

  update(id: number, updateIncomeExpenseDto: UpdateIncomeExpenseDto) {
    return `This action updates a #${id} incomeExpense`;
  }

  remove(id: number) {
    return `This action removes a #${id} incomeExpense`;
  }
}
