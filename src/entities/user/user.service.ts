import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSaltSync, hashSync } from 'bcryptjs';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    return this.userRepository.findAndCount();
  }

  async create(userData: AuthDto) {
    const newUser = await this.userRepository.create({
      login: userData.login,
      password: userData.password,
    });

    console.log(newUser);
    await this.userRepository.save(newUser);

    return newUser;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { login: email } });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { login: email } });
    if (!user) throw new UnauthorizedException('User not found');
    const isCorrectPassword = password === user.password;
    if (!isCorrectPassword) throw new UnauthorizedException('Wrong password');

    return { login: user.login, role: user.role };
  }
}
