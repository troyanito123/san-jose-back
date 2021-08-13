import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
} from 'class-validator';
import { IncomeExpenseType } from '../entities/income-expense.entity';

export class CreateIncomeExpenseDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumberString()
  mount: number;

  @IsEnum(IncomeExpenseType)
  type: IncomeExpenseType;

  @IsNotEmpty()
  from_user: string;

  @IsNotEmpty()
  to_user: string;

  @IsNotEmpty()
  code: string;
}
