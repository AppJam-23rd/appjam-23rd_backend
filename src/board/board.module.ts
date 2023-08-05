import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardEntity } from "./board.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule,
    TypeOrmModule.forFeature([
      BoardEntity,
    ])
  ],
  controllers: [BoardController],
  providers: [BoardService,JwtService,ConfigService]
})
export class BoardModule {}
