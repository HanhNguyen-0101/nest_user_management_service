import { User } from '../../infrastructure/database/entities';

export interface IUserModel {
  email: string;
  firstName: string;
  globalId?: string;
  id?: string;
  isDisable?: boolean;
  isPending?: boolean;
  isRegisteredWithGoogle?: boolean;
  lastName: string;
  officeCode?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
  updatedByUser?: IUserModel | null;
}

export interface IGetAllUser {
  data: Array<User>;
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
}

