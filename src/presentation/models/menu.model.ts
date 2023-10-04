import { Menu } from 'src/infrastructure/database/entities';

export interface IMenuModel {
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  key: string;
  parentId?: string;
  parentMenu?: IMenuModel;
}

export interface IGetAllMenu {
  data: Array<Menu>;
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
}
