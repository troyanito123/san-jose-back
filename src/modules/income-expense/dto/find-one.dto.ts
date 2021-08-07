import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { IncomeExpense } from '../entities/income-expense.entity';

export class FindOneDto {
  @ExistsOnDatabase(IncomeExpense)
  id: number;
}
