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
import { User } from './user.entity';
import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
    unique: true,
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
    type: 'uuid',
    nullable: true,
    default: null,
  })
  createdBy: string;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  updatedBy: string;

  @Column('text')
  description: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermission[];

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'updatedBy' })
  updatedByUser: User;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'createdBy' })
  createdByUser: User;
}
