import {
  Entity,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  name: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
  })
  updatedAt: Date;

  @Column({
    unique: true,
  })
  key: string;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  parentId: string;

  @ManyToOne(() => Menu, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentId' })
  parentMenu: Menu;
}
