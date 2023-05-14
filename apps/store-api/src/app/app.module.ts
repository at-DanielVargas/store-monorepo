import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { SalesModule } from './sales/sales.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ProductsModule } from './products/products.module';
import { MarketsModule } from './markets/markets.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // MongooseModule.forRoot(
    //   'mongodb+srv://goc_test_user:g2LR4cw9evhP8m2@goc.aojondw.mongodb.net/?retryWrites=true&w=majority',
    //   { dbName: 'store' }
    // ),
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST');

        return {
          uri: `mongodb://${username}:${password}@${host}/?retryWrites=true&w=majority`,
          dbName: database,
        };
      },
      inject: [ConfigService],
    }),
    ProductsModule,
    CategoriesModule,
    SalesModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    MarketsModule,
    SuppliersModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
