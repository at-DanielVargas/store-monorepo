import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { FilterQuery, Model } from 'mongoose';
import { Role, RoleDocument } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>
  ) {}

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).populate({
      path: 'roles',
      populate: {
        path: 'permissions',
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id).populate({
      path: 'roles',
      populate: {
        path: 'permissions',
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  /**
   *
   * @param id user mongo id
   * @returns
   */
  async getUserPermissions(id: string) {
    const user = await this.userModel.findById(id).populate({
      path: 'roles',
      populate: {
        path: 'permissions',
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    console.log(user)
    return []
    // return user.roles.reduce(
    //   (acc, current) => [...acc, current.permissions.map((p: Permission) => p.action)],
    //   []
    // );
  }

  async create(createUserDto: CreateUserDto) {
    const defaultRole = await this.roleModel.findOne({ name: 'Customer' });
    const user = new this.userModel({
      ...createUserDto,
    });
    user.roles = [defaultRole];
    return user.save();
  }

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string
  ) {
    const filters: FilterQuery<UserDocument> = startId
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

    const findQuery = this.userModel
      .find(filters)
      .sort({ _id: 1 })
      .skip(documentsToSkip)
      .select('firstname lastname email');

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const users = await findQuery;
    const count = await this.userModel.count();

    return { users, count };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
