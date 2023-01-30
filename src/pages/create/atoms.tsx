import { atom } from 'recoil';

export interface IStates {
  status: number;
}

export const status = atom<IStates>({
  key: 'status',
  default: { status: 0 },
});

export const contactNumber = atom<string | undefined>({
  key: 'contactNumber',
  default: '',
});

export const universityId = atom<number | undefined>({
  key: 'universityId',
  default: 0,
});

export const regionId = atom<number | undefined>({
  key: 'regionId',
  default: 0,
});
export const latitude = atom<number>({
  key: 'latitude',
  default: 0,
});
export const longitude = atom<number>({
  key: 'longitude',
  default: 0,
});
export const monthCost = atom<number | undefined>({
  key: 'monthCost',
  default: 0,
});
export const deposit = atom<number | undefined>({
  key: 'deposit',
  default: 0,
});
export const costOtherInfo = atom<string | undefined>({
  key: 'costOtherInfo',
  default: '',
});
export const gender = atom<number | undefined>({
  key: 'gender',
  default: 0,
});
export const houseCategoryId = atom<number | undefined>({
  key: 'houseCategoryId',
  default: 0,
});
export const houseOtherInfo = atom<string | undefined>({
  key: 'houseOtherInfo',
  default: '',
});

export const tempaddress = atom<string>({
  key: 'address',
  default: '0',
});

export const tempfile = atom<Blob[]>({
  key: 'tempphoto',
  default: [],
});
export const realfile = atom<any>({
  key: 'realfile',
  default: {},
  dangerouslyAllowMutability: true,
});
