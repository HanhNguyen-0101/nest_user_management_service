import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RolePermission } from '../../role-permissions/entities/role-permission.entity';
import { PermissionGroup } from '../../permission-groups/entities/permission-group.entity';

@Entity()
export class Permission {
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

  @Column('text')
  description: string;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
  })
  updatedAt: Date;

  @Column()
  code: string;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  permissionGroupId: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  rolePermissions: RolePermission[];

  @ManyToOne(() => PermissionGroup, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'permissionGroupId' })
  permissionGroup: PermissionGroup;
}
