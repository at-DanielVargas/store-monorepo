import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { FilterQuery, Model } from 'mongoose';
import { Category } from '../categories/entities/category.entity';
import { isMongoId } from 'class-validator';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel({
      ...createProductDto,
    });
    if (!isMongoId(createProductDto.category)) {
      const category = await this.categoryModel.create(
        createProductDto.category
      );
      createdProduct.category = category;
    }
    await createdProduct.populate('category');
    return createdProduct.save();
  }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string
  ) {
    const filters: FilterQuery<ProductDocument> = startId
      ? {
          _id: {
            $gt: startId,
          },
        }
      : {};

    if (searchQuery) {
      filters.$text = {
        $search: searchQuery,
      };
    }

    const findQuery = this.productModel
      .find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip)
      .populate('category');

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.productModel.count();

    return { results, count };
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate('category', 'name description');
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
