
import bcrypt from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn, ManyToMany,ManyToOne
} from "typeorm";
import { FreezerEntity } from "../freezer/freezer.entity";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  user_uuid: string;

  @Column({ length: 20, nullable: false, unique: true })
  user_id: string;

  @Column({ length: 20, nullable: true })
  user_name: string;

  @Column({ length: 200, nullable: false, select: false })
  user_pw: string;

  @Column({ type: 'longtext', nullable: true })
  user_profile_image: string;

  @Column({ length: 20, nullable: false })
  region: string;

  @Column("simple-array", { nullable: true })
  allergy: string[];

  @Column({ length: 20, nullable: false })
  region_group: string;

  @CreateDateColumn({ insert: false, update: false, select: false })
  user_created_date: Date;

  @UpdateDateColumn({ insert: false, select: false })
  user_updated_date: Date;

  @DeleteDateColumn({ insert: false, select: false })
  user_deleted_at: Date;

  @ManyToMany(() => FreezerEntity, (freezer) => freezer.members)
  freezers: FreezerEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async savePw(): Promise<void> {
    if (this.user_pw) {
      this.user_pw = await bcrypt.hash(this.user_pw, 10);
    }
  }

  @BeforeInsert()
  nullUUID(): void {
    if (this.user_uuid) {
      delete this.user_uuid;
    }
  }

  @ManyToOne(() => FreezerEntity, (freezer) => freezer.members)
  freezer: FreezerEntity;
}
