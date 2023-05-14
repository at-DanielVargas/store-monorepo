import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';
import { CreateCategoryDto } from '../../categories/dto/create-category.dto';
import { Type } from 'class-transformer';
export class CreateProductDto {
  @ApiProperty({ example: 'Razer Keyboard' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Mechanical keyboard with x color switches' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 125 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 90 })
  @IsNumber()
  supplierPrice: number;

  @ApiProperty({ example: 14 })
  @IsNumber()
  stock: number;

  @ApiPropertyOptional({ type: CreateCategoryDto })
  @Type(() => CreateCategoryDto)
  category?: Category;
}
