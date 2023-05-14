import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';
import RequestWithUser from './requestWithUser.interface';
import { SetMetadata } from '@nestjs/common';

export const Permissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler()
    );
    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    const userPermissions = await this.userService.getUserPermissions(
      user._id.toString()
    );

    return requiredPermissions.some((permission) =>
      userPermissions.includes(permission)
    );
  }
}
