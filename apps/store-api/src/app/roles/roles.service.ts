import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './entities/role.entity';
import { Model, ObjectId } from 'mongoose';
import {
  Permission,
  PermissionDocument,
} from '../permissions/entities/permission.entity';
import { isMongoId } from 'class-validator';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    // const permissions = await Promise.all(
    //   createRoleDto.permissions.map(
    //     async (permissionData: Permission | ObjectId) => {
    //       if (!isMongoId(permissionData)) {
    //         const createdPermission = new this.permissionModel(permissionData);
    //         return await createdPermission.save();
    //       }
    //       return permissionData;
    //     }
    //   )
    // );

    // const role = new this.roleModel({
    //   name: createRoleDto.name,
    //   description: createRoleDto.description,
    // });
    // role.permissions = permissions.map((permission) => permission._id);
    // await role.save();
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: string) {
    return `This action returns a #${id} role`;
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: string) {
    return `This action removes a #${id} role`;
  }
}
