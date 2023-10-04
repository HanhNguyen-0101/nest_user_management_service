import { RolePermission } from 'src/infrastructure/database/entities';
import { IPermissionModel } from './permission.model';
import { IRoleModel } from './role.model';

export interface IRolePermissionModel {
  permissionId?: string;
  roleId?: string;
  permission?: IPermissionModel | null;
  role?: IRoleModel | null;
}

export interface ICompositeKeyRolePermission {
  permission_id: string;
  role_id: string;
}

export interface IGetAllRolePermission {
  data: Array<RolePermission>;
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
}