import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import {
  Category,
  CategorySchema,
} from '../categories/entities/category.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    AuthenticationModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
