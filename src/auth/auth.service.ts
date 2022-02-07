import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async login(email: string, role: string) {
    const payload = { email, role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
