import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Market } from '../../markets/entities/market.entity';
import { SaleItem } from '../entities/sale-item.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { CreateMarketDto } from '../../markets/dto/create-market.dto';
import { CreateSaleItemDto } from './create-sale-item.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';

export class CreateSaleDto {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ type: () => CreateUserDto })
  @Type(() => UpdateUserDto)
  customer: UpdateUserDto;

  @ApiProperty({ type: () => CreateMarketDto })
  @Type(() => Market)
  market: Market;

  @ApiProperty()
  @Type(() => CreateSaleItemDto)
  items: SaleItem;
}
