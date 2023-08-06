import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardEntity } from "./board.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
    private jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
  }

  getUUIDFromReq(req: any): string {
    return this.jwtService.verify(req.headers.authorization.split(" ")[1], {
      secret: this.config.get("ACCESS_TOKEN_SECRET"),
    }).user_uuid;
  };

  async fetchAllBoardsWithProfile() {
    const temp = await this.boardRepository.find();
    const result = await Promise.all(temp.map(async (board) => {
      const {user_uuid} = board;
      const profile = await this.userService.getUserByUUID(user_uuid);
      return {
        ...board,
        profile,
      };
    }));
    return result;
  }

  async updateBoard(board: BoardEntity) {
    const { board_uuid } = board;
    await this.boardRepository.update({ board_uuid }, board);
    return await this.boardRepository.findOne({
      where: { board_uuid },
    });
  }

  async createBoard(user_uuid:string, board: BoardEntity) {
    // put region from user_uuid
    const {region,region_group} = await this.userService.getUserByUUID(user_uuid);
    return this.boardRepository.save({
      user_uuid,
      ...board,
      region,
      region_group,
    });
  };

  async deleteBoard(board_uuid: string) {
    await this.boardRepository.delete({ board_uuid });
  }

}
