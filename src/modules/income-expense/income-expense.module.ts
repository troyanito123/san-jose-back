import { Module } from '@nestjs/common';
import { IncomeExpenseService } from './income-expense.service';
import { IncomeExpenseController } from './income-expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeExpense } from './entities/income-expense.entity';
import { UserModule } from '../user/user.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([IncomeExpense]),
    UserModule,
    CloudinaryModule,
  ],
  controllers: [IncomeExpenseController],
  providers: [IncomeExpenseService],
})
export class IncomeExpenseModule {}
