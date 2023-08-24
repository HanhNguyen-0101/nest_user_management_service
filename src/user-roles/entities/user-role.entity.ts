import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @PrimaryGeneratedColumn('uuid')
  roleId: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
  })
  assignedAt: Date;

  @ManyToOne(() => User, (user) => user.userRoles, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: 'CASCADE',
  })
  role: Role;
}
