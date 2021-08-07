import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  Request,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { IncomeExpenseService } from './income-expense.service';
import { CreateIncomeExpenseDto } from './dto/create-income-expense.dto';
import { UpdateIncomeExpenseDto } from './dto/update-income-expense.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleOptions, Roles } from '../auth/authorization/role.decorator';
import { RolesGuard } from '../auth/authorization/role.guard';
import { FindOneDto } from './dto/find-one.dto';

@Controller('income-expense')
@Roles(RoleOptions.Admin)
@UseGuards(JwtAuthGuard)
export class IncomeExpenseController {
  constructor(private readonly incomeExpenseService: IncomeExpenseService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: join(__dirname, '../../public/img/uploads'),
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @UseGuards(RolesGuard)
  create(
    @Body() createIncomeExpenseDto: CreateIncomeExpenseDto,
    @Request() req,
    @UploadedFile() file,
  ) {
    return this.incomeExpenseService.create(
      createIncomeExpenseDto,
      req.user.id,
      file,
    );
  }

  @Get()
  findAll() {
    return this.incomeExpenseService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneDto) {
    return this.incomeExpenseService.findOne(params.id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateIncomeExpenseDto: UpdateIncomeExpenseDto,
  ) {
    return this.incomeExpenseService.update(+id, updateIncomeExpenseDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.incomeExpenseService.remove(+id);
  }
}
