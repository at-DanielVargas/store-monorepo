import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePermissionDto } from '../../permissions/dto/create-permission.dto';
import { Type } from 'class-transformer';
import { Permission } from '../../permissions/entities/permission.entity';
import { IsArray, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ type: [CreatePermissionDto] })
  @Type(() => CreatePermissionDto)
  permissions?: Permission[] | ObjectId[];
}
