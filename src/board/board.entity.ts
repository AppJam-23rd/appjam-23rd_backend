import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn,
  PrimaryColumn,
} from "typeorm";

@Entity("board")
export class BoardEntity {
  @PrimaryGeneratedColumn("uuid")
  board_uuid: string;

  @Column({ length: 36, nullable: false, update: false })
  user_uuid: string;

  @Column({ length: 36, nullable: false })
  title: string;

  @Column({ type: 'longtext', nullable: false })
  content: string;

  @Column({ type: 'longtext', nullable: true })
  image: string;

  @Column({ nullable: false })
  region_group: string;

  @Column({ nullable: false })
  region: string;
}
