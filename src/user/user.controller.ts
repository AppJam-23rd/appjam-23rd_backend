import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Req,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { AccessGuard } from 'src/auth/access.guard';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @UseGuards(AccessGuard)
  async getId(@Req() req): Promise<string> {
    return this.userService.getId(this.userService.getUUIDFromReq(req));
  }

  @Get('findall')
  @UseGuards(AccessGuard)
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Post('fetch')
  @HttpCode(200)
  @UseGuards(AccessGuard)
  async fetchUser(@Body() body): Promise<UserEntity> {
    return this.userService.fetchUser(body.user_id);
  }

  @Patch()
  @UseGuards(AccessGuard)
  async updateUser(@Req() req, @Body() body): Promise<UserEntity> {
    return this.userService.updateUser(body);
  }

  @Get('info')
  @UseGuards(AccessGuard)
  async getUserInfo(@Req() req): Promise<UserEntity> {
    return this.userService.getUserByUUID(
      this.userService.getUUIDFromReq(req),
    )
  }
}
