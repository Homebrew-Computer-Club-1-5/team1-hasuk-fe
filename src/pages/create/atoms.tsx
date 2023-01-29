import { atom } from 'recoil';

export interface IStates {
  status: number;
}

export interface IhouseData {
  contact_number?: string;
  university_id?: number;
  region_id?: number;
  latitude?: number;
  longitude?: number;
  month_cost?: number;
  deposit?: number;
  cost_other_info?: string;
  gender?: number;
  house_category_id?: number;
  house_other_info?: string;
}

export const status = atom<IStates>({
  key: 'status',
  default: { status: 0 },
});

export const information = atom<IhouseData>({
  key: 'information',
  default: {},
});

export const tempaddress = atom<string>({
  key: 'address',
  default: '0',
});
