import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';
import { UniqueOnDatabase } from 'src/validations/unique-on-database';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @UniqueOnDatabase(User)
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
