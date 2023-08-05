import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { BoardEntity } from "./board.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardService } from "./board.service";
import { AccessGuard } from "../auth/access.guard";

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
  ) {
  }

  @Get()
  @UseGuards(AccessGuard)
  async fetchAllBoards(@Req() req): Promise<BoardEntity[]> {
    return await this.boardService.fetchAllBoards();
  }

  @Post()
  @UseGuards(AccessGuard)
  async createBoard(@Req() req, @Body() board): Promise<BoardEntity> {
    return await this.boardService.createBoard(
      this.boardService.getUUIDFromReq(req),
      board,
    );
  };

  @Delete()
  @UseGuards(AccessGuard)
  async deleteBoard(@Req() req, @Body() board): Promise<void> {
    return await this.boardService.deleteBoard(
      board.board_uuid,
    );
  }

  @Patch()
  @UseGuards(AccessGuard)
  async updateBoard(@Req() req, @Body() board): Promise<BoardEntity> {
    return await this.boardService.updateBoard(
      board,
    );
  }
}
