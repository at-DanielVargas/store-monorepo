import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { CreatePermissionDto } from '../../permissions/dto/create-permission.dto';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({
    oneOf: [
      { type: 'array', items: { type: 'string' } },
      { type: 'array', items: { $ref: getSchemaPath(CreatePermissionDto) } },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => Array<CreatePermissionDto | string>)
  permissions: Array<CreatePermissionDto | string>;
}
