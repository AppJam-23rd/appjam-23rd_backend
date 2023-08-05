import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { FoodService } from "./food.service";
import { FoodEntity } from "./food.entity";
import { AccessGuard } from "../auth/access.guard";

@Controller({path:'food' , version:'1'})
export class FoodController {
  constructor(private readonly foodService: FoodService) {
  }

  @Get()
  @UseGuards(AccessGuard)
  async fetchAllFoods(@Req() req): Promise<FoodEntity[]> {
    return await this.foodService.fetchAllFoods();
  }

  @Get(":code")
  @UseGuards(AccessGuard)
  async fetchFood(@Req() req): Promise<FoodEntity> {
    return await this.foodService.fetchFood(req.params.code);
  }

  @Post()
  @UseGuards(AccessGuard)
  async createFood(@Req() req): Promise<FoodEntity> {
    return await this.foodService.createFood(req.body);
  }
}
