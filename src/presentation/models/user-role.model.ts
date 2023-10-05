import { UserRole } from '../../infrastructure/database/entities';
import { IRoleModel } from './role.model';
import { IUserModel } from './user.model';

export interface IUserRoleModel {
  userId?: string;
  roleId?: string;
  assignedAt?: string;
  user?: IUserModel | null;
  role?: IRoleModel | null;
}

export interface ICompositeKeyUserRole {
  user_id: string;
  role_id: string;
}

export interface IGetAllUserRole {
  data: Array<UserRole>;
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
}
