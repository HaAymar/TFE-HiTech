import { Request } from 'express';

import {
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
// import { AuthPayloadDto } from './dtos/auth.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    // login(@Body() authPayload: AuthPayloadDto)
    // const user = this.authService.validateUser(authPayload);
    if (!req.user) throw new HttpException('Invalid Credentials', 401);

    return req.user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log('Inside AuthController status method');
    console.log(req.user);
    return req.user;
  }
}
