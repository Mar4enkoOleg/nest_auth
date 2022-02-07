import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from 'src/entities/user/user.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    console.log(dto);

    const oldUser = await this.userService.findByEmail(dto.login);
    console.log(oldUser);

    if (oldUser) throw new BadRequestException('Email is exist');
    return await this.userService.create(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    const { login, role } = await this.userService.validateUser(
      dto.login,
      dto.password,
    );
    return this.authService.login(login, role);
  }
}
