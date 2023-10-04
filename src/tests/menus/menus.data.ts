import { IMenuModel } from 'src/presentation/models';

export const mockMenu = {
  id: 'f6f523ae-7942-44a5-b968-57bb7cf85264',
  name: 'Mdm Vsl Cntr',
  createdAt: '2023-09-10T09:34:58.942Z',
  updatedAt: '2023-09-10T09:34:58.942Z',
  key: 'mdm_vsl_cntr',
  parentId: 'efa99cdc-565d-418f-92ae-f1ed18e7828c',
  parentMenu: {
    id: 'efa99cdc-565d-418f-92ae-f1ed18e7828c',
    name: 'Vessel Management',
    createdAt: '2023-09-10T09:32:05.117Z',
    updatedAt: '2023-09-20T16:33:33.627Z',
    key: 'vessel-management-main',
    parentId: null,
  },
};
export const createMenuDto = {
  name: 'Mdm Vsl Cntr',
  key: 'mdm_vsl_cntr',
  parentId: 'efa99cdc-565d-418f-92ae-f1ed18e7828c',
} as IMenuModel;
export const updateMenu = {
  id: 'f6f523ae-7942-44a5-b968-57bb7cf85264',
  updatedMenuDto: {
    name: 'Mdm Vsl Cntr',
    key: 'mdm_vsl_cntr',
    parentId: 'efa99cdc-565d-418f-92ae-f1ed18e7828c',
  } as IMenuModel,
};
