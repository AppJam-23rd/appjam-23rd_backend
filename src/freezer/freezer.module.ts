import { Module } from '@nestjs/common';
import { FreezerController } from './freezer.controller';
import { FreezerService } from './freezer.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FreezerEntity, FreezerItemEntity } from "./freezer.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserEntity } from "../user/user.entity";
import { FoodEntity } from "../food/food.entity";
import { FoodModule } from "../food/food.module";
import { FoodService } from "../food/food.service";

@Module({
  imports: [
    FoodModule,
    TypeOrmModule.forFeature([
      FreezerEntity,
      FreezerItemEntity,
    ]),
  ],
  controllers: [FreezerController],
  providers: [FreezerService,
    JwtService,ConfigService]
})
export class FreezerModule {}
