import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  Req,
  Res,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CreateUser } from "src/user/user.interface";
import { UserEntity } from "src/user/user.entity";
import { HttpException } from "@nestjs/common/exceptions/http.exception";

@Controller({
  path: "auth",
  version: "1",
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post("register")
  async createUser(@Body() userData: CreateUser): Promise<UserEntity> {
    const user = await this.authService.validateUser(userData.user_id, userData.user_pw);
    return this.authService.createUser(userData);
  }

  @Post("login")
  @HttpCode(200)
  @UseGuards(AuthGuard("local"))
  async login(@Req() req,@Body() userData) {
    const { user_id, user_pw } = userData;
    const user = await this.authService.validateUser(user_id, user_pw);
    if(user) {
      const accessToken = await this.authService.getAccessToken(user_id);
      return { accessToken: accessToken };
    }
  }
}
