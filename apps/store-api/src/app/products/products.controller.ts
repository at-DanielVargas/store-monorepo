import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { PaginationParams } from '../utils/paginationParams';
import {
  PermissionGuard,
  Permissions,
} from '../authentication/permissions.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBearerAuth()
  // @UseGuards(JwtAuthenticationGuard)
  @UseGuards(PermissionGuard)
  @Permissions('create_product')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query() { skip, limit, startId }: PaginationParams,
    @Query('searchQuery') searchQuery: string
  ) {
    return this.productsService.findAll(skip, limit, startId, searchQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
