// import { UserRole } from 'src/user-roles/entities/user-role.entity';
import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserRole } from '../../user-roles/entities/user-role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    nullable: true,
    default: true,
  })
  isPending: boolean;

  @Column({
    nullable: true,
    default: false,
  })
  isDisable: boolean;

  @CreateDateColumn({
    type: 'timestamp without time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
  })
  updatedAt: Date;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  updatedBy: string;

  @Column()
  firstName: string;

  @Column({
    nullable: true,
  })
  lastName: string;

  @Column({
    nullable: true,
  })
  globalId: string;

  @Column({
    nullable: true,
  })
  officeCode: string;

  @Column({
    nullable: true,
  })
  country: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'updatedBy' })
  updatedByUser: User;

  @OneToMany(() => UserRole, (userRole) => userRole.user) // eager: true => Limit because affect to performance because auto query the relation data
  userRoles: UserRole[];
}
