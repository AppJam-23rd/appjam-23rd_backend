import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import bcrypt from 'bcrypt';
import { CreateUser } from 'src/user/user.interface';
import { UserEntity } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(userData: CreateUser): Promise<UserEntity> {
    const existingUser = await this.getUserById(userData.user_id);
    if (existingUser) {
      throw new HttpException('User already exists', 400);
    }
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return this.getUserById(userData.user_id);
  }

  async validateUser(user_id:string, user_pw:string): Promise<UserEntity> {
    const uuid = await this.getUUIDById(user_id);
    if (uuid) {
      const user = await this.getUserPwByUUID(uuid);
      if (user && (await bcrypt.compare(user_pw, user.user_pw))) {
        return user;
      }
    }
    return null;
  }

  async getUUIDById(user_id: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { user_id },
      select: ['user_uuid'],
    });
    return user?.user_uuid;
  }

  async getUserById(user_id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { user_id } });
  }

  async getUserByUUID(user_uuid: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { user_uuid } });
  }

  async getUserPwByUUID(user_uuid: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { user_uuid },
      select: ['user_id', 'user_pw'],
    });
  }

  getToken(user_uuid: string, kind: string): string {
    return this.jwtService.sign(
      { user_uuid },
      {
        secret: this.config.get(`${kind}_TOKEN_SECRET`),
        expiresIn: this.config.get(`${kind}_TOKEN_EXPIRES_IN`),
      },
    );
  }


  async getAccessToken(id: string): Promise<string> {
    const uuid = await this.getUUIDById(id);
    const accessToken = this.getToken(uuid, "ACCESS");
    return accessToken;
  }

  async login(user: UserEntity): Promise<object> {
    const { user_uuid } = user;
    const accessToken = this.getToken(user_uuid, 'ACCESS');
    return {
      accessToken: accessToken,
    }
  }
}
