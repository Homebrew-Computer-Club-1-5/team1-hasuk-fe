import { atom } from 'recoil';

export interface IStates {
  status: number;
}

export interface Iinfo {
  tel?: string;
  univ?: string;
  area?: number;
  address?: string;
  latitude?: number;
  longitude?: number;

  monthly?: number;
  deposit?: number;
  fee?: number;
  gender?: number;
  category?: number;
  etc?: string;
}

export const status = atom<IStates>({
  key: 'status',
  default: { status: 0 },
});

export const information = atom<Iinfo>({
  key: 'information',
  default: {},
});
