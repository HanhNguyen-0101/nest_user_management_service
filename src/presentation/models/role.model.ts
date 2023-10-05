import { Role } from '../../infrastructure/database/entities';
import { IUserModel } from './user.model';

export interface IRoleModel {
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  createBy?: string;
  updatedBy?: string;
  description?: string;
  updatedByUser?: IUserModel | null;
  createdByUser?: IUserModel | null;
  rolePermissions?: [] | null;
}

export interface IGetAllRole {
  data: Array<Role>;
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
}
