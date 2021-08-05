import { Injectable } from '@nestjs/common';
import { CreateIncomeExpenseDto } from './dto/create-income-expense.dto';
import { UpdateIncomeExpenseDto } from './dto/update-income-expense.dto';

@Injectable()
export class IncomeExpenseService {
  create(
    createIncomeExpenseDto: CreateIncomeExpenseDto,
    userId: number,
    image: Express.Multer.File,
  ) {
    return {
      data: createIncomeExpenseDto,
      userId,
      image: image.filename,
    };
  }

  findAll() {
    return `This action returns all incomeExpense`;
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
