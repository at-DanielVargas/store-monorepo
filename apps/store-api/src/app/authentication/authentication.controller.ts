import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import SignInDto from './dto/signIn.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @Post('login')
  async logIn(@Body() userData: SignInDto) {
    return this.authenticationService.generateCredentials(userData);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    request.res?.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut()
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }
}
