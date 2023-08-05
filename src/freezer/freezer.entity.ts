import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { UserEntity } from "../user/user.entity";

@Entity('freezers')
export class FreezerEntity {
  @PrimaryGeneratedColumn('increment')
  freezer_id: string;

  @Column({ length: 36, nullable: false })
  user_uuid: string;

  @ManyToMany(() => UserEntity, (user) => user.freezers)
  members: UserEntity[];

  @Column({ length: 20, nullable: false })
  name: string;
}

@Entity('freezer_items')
export class FreezerItemEntity {
  @PrimaryGeneratedColumn('uuid')
  freezer_item_uuid: string;

  @Column({ length: 36, nullable: false })
  food_id: string;

  @Column({ length: 36, nullable: false })
  freezer_id: string;

  @Column({ nullable: false })
  count: number;

  @Column({ nullable: false })
  expiration_date: Date;
}
