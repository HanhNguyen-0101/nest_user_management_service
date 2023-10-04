import { Permission } from 'src/infrastructure/database/entities';
import { IPermissionGroupModel } from './permission-group.model';

export interface IPermissionModel {
  id?: string;
  name: string;
  createdAt?: string;
  description?: string;
  updatedAt?: string;
  code?: string;
  permissionGroupId?: string;
  permissionGroup?: IPermissionGroupModel;
}

export interface IGetAllPermission {
  data: Array<Permission>;
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
}
