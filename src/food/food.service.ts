import { Injectable } from '@nestjs/common';
import { FoodEntity } from "./food.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(FoodEntity)
    private readonly foodRepository: Repository<FoodEntity>,
  ) {}
  async fetchAllFoods() {
    return await this.foodRepository.find();
  }

  async fetchFood(code: string) {
    return await this.foodRepository.findOne({
      where: { code },
    });
  }

  async createFood(food: FoodEntity) {
    const foodCreate = this.foodRepository.create({
      ...food,
    });
    await this.foodRepository.save(foodCreate);
    return this.fetchFood(foodCreate.code);
  }
}
