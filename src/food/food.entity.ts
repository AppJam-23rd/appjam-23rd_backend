import { Column, Entity, PrimaryGeneratedColumn,ManyToOne } from "typeorm";
import { FreezerEntity } from "../freezer/freezer.entity";

@Entity("foods")
export class FoodEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 36, nullable: false })
  name: string;

  @Column({ length: 36, nullable: false })
  code: string;

  @Column("simple-array",{ nullable: false })
  raw_materials: string[];

  @Column({ type:'longtext', nullable: false })
  image: string;

  @Column({ length: 36, nullable: true })
  kcal: string;

  @Column({ length: 36, nullable: true })
  carbohydrate: string;

  @Column({ length: 36, nullable: true })
  protein: string;

  @Column({ length: 36, nullable: true })
  fat: string;

  @Column({ length: 36, nullable: true })
  sugar: string;

  @Column({ length: 36, nullable: true })
  sodium: string;

  @Column({ length: 36, nullable: true })
  cholesterol: string;

  @Column({ length: 36, nullable: true })
  saturated_fat: string;

  @Column({ length: 36, nullable: true })
  trans_fat: string;

  @Column({ length: 36, nullable: true })
  dietary_fiber: string;

  @Column({ length: 36, nullable: true })
  vitamin_a: string;

  @Column({ length: 36, nullable: true })
  vitamin_c: string;

  @Column({ length: 36, nullable: true })
  calcium: string;

  @Column({ length: 36, nullable: true })
  iron: string;

  @Column({ length: 36, nullable: true })
  vitamin_d: string;

  @Column({ length: 36, nullable: true })
  vitamin_e: string;

  @Column({ length: 36, nullable: true })
  vitamin_k: string;

  @Column({ length: 36, nullable: true })
  vitamin_b: string;
}

