import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { FreezerService } from "./freezer.service";
import { FreezerEntity } from "./freezer.entity";
import { AccessGuard } from "../auth/access.guard";
import { FreezerItem } from "./freezer.intrerface";
import { UpdateResult } from "typeorm";

@Controller('freezer')
export class FreezerController {
  constructor(
    private readonly freezerService: FreezerService
  ) {
  }

  @Get()
  @UseGuards(AccessGuard)
  async fetchAllFreezers(@Req() req): Promise<FreezerEntity[]> {
    return await this.freezerService.fetchAllFreezers(
      this.freezerService.getUUIDFromReq(req),
    );
  }

  @Post()
  @UseGuards(AccessGuard)
  async createFreezer(@Req() req, @Body() freezer): Promise<FreezerEntity> {
    return await this.freezerService.createFreezer(
      this.freezerService.getUUIDFromReq(req),
      freezer,
    );
  }

  @Patch()
  @UseGuards(AccessGuard)
  async updateFreezer(@Req() req, @Body() freezer) {
    return await this.freezerService.updateFreezer(
      freezer,
    );
  }

  @Delete()
  @UseGuards(AccessGuard)
  async deleteFreezer(@Req() req, @Body() freezer) {
    return await this.freezerService.deleteFreezer(
      freezer.freezer_uuid,
    );
  }

  @Post("add")
  @UseGuards(AccessGuard)
  async addFoodToFreezer(@Req() req, @Body() food:FreezerItem) {
    return await this.freezerService.addFoodToFreezer(
      this.freezerService.getUUIDFromReq(req),
      food,
    );
  };

  @Get(":id")
  @UseGuards(AccessGuard)
  async fetchFreezer(@Req() req){
    return await this.freezerService.fetchFreezer(req.params.id);
  }

  @Get("item/:id")
  @UseGuards(AccessGuard)
  async fetchFreezerItem(@Req() req){
    return await this.freezerService.fetchFreezerItem(req.params.id);
  }

  @Delete("item/:id")
  @UseGuards(AccessGuard)
  async deleteFreezerItem(@Req() req){
    return await this.freezerService.deleteFreezerItem(req.params.id);
  }

  @Patch("item/:id")
  @UseGuards(AccessGuard)
  async updateFreezerItem(@Req() req, @Body() freezerItem:FreezerItem){
    return await this.freezerService.updateFreezerItem(req.params.id, freezerItem);
  }

}
