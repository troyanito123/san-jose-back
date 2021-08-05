import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum IncomeExpenseType {
  income = 'INCOME',
  expense = 'EXPENSE',
}

@Entity('income_expense')
export class IncomeExpense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  mount: number;

  @Column()
  type: IncomeExpenseType;

  @Column()
  from_user: string;

  @Column()
  to_user: string;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.incomeExpenses)
  user: User;
}
