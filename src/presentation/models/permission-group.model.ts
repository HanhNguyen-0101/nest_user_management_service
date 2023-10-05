import { PermissionGroup } from '../../infrastructure/database/entities';

export interface IPermissionGroupModel {
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IGetAllPermissionGroup {
  data: Array<PermissionGroup>;
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
}
