import { Injectable } from '@nestjs/common';
import { FreezerEntity, FreezerItemEntity } from "./freezer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { FreezerItem } from "./freezer.intrerface";
import { FoodEntity } from "../food/food.entity";
import { async } from "rxjs";
import { FoodService } from "../food/food.service";

@Injectable()
export class FreezerService {
    constructor(
      @InjectRepository(FreezerEntity)
      private readonly freezerRepository: Repository<FreezerEntity>,
      @InjectRepository(FreezerItemEntity)
      private readonly freezerItemRepository: Repository<FreezerItemEntity>,
      private jwtService: JwtService,
      private readonly config: ConfigService,
      private readonly foodService: FoodService
    ) {}

  getUUIDFromReq(req: any): string {
    return this.jwtService.verify(req.headers.authorization.split(" ")[1], {
      secret: this.config.get("ACCESS_TOKEN_SECRET"),
    }).user_uuid;
  };

    async fetchAllFreezers(user_uuid:string): Promise<FreezerEntity[]> {
      return await this.freezerRepository.find(
      { where: { user_uuid } }
      );
    }

    async fetchAllFreezersWithItemCount(user_uuid:string) {
      const temp = await this.freezerRepository.find(
        { where: { user_uuid } }
      );
      const freezers = await Promise.all(temp.map(async (freezer) => {
        const count = await this.freezerItemRepository.count({
          where: { freezer_id: freezer.freezer_id },
        });
        return {
          ...freezer,
          count,
        };
      }));
      return freezers;
    }

    async createFreezer(user_uuid:string, freezer:FreezerEntity): Promise<FreezerEntity> {
      return this.freezerRepository.save({
        user_uuid,
        ...freezer,
      });
    }

    async addFoodToFreezer(food:FreezerItem) {
      // make item and add it to freezer
      const freezerItem = this.freezerItemRepository.create({
        ...food
      });
      return this.freezerItemRepository.save(freezerItem);
    }

    async fetchFreezer(freezer_id:string) {
      return this.freezerItemRepository.find({
        where: { freezer_id },
      });
    }

    async fetchFreezerItem(freezer_item_uuid:string) {
      const item = await this.freezerItemRepository.findOne({
        where: { freezer_item_uuid },
      });
      const food = await this.foodService.fetchFoodById(item.food_id);
      return {
        ...item,
        ...food,
      }
    }

    async deleteFreezerItem(freezer_item_uuid:string) {
      return this.freezerItemRepository.delete({ freezer_item_uuid });
    }

    async updateFreezerItem(freezer_item_uuid:string, freezerItem:FreezerItem) {
      return this.freezerItemRepository.update({ freezer_item_uuid }, freezerItem);
    }

    async deleteFreezer(freezer_id:string) {
      return this.freezerRepository.delete({ freezer_id });
    }

    async updateFreezer(freezer:FreezerEntity) {
      const { freezer_id } = freezer;
      return this.freezerRepository.update({ freezer_id }, freezer);
    }
}
