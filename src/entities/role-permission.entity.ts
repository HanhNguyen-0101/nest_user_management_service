import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  roleId: string;

  @PrimaryGeneratedColumn('uuid')
  permissionId: string;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
    onDelete: 'CASCADE',
  })
  permission: Permission;

  @ManyToOne(() => Role, (role) => role.rolePermissions, {
    onDelete: 'CASCADE',
  })
  role: Role;
}
