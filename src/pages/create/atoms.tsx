import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export interface IStates {
  status: number;
}
export interface IPreview {
  link: string;
}

export const status = atom<IStates>({
  key: 'status',
  default: { status: 0 },
  effects_UNSTABLE: [persistAtom],
});

export const contactNumber = atom<string | undefined>({
  key: 'contactNumber',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const universityId = atom<number | undefined>({
  key: 'universityId',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const regionId = atom<number | undefined>({
  key: 'regionId',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const latitude = atom<number>({
  key: 'latitude',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const longitude = atom<number>({
  key: 'longitude',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const monthCost = atom<number | undefined>({
  key: 'monthCost',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const deposit = atom<number | undefined>({
  key: 'deposit',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const costOtherInfo = atom<string | undefined>({
  key: 'costOtherInfo',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
export const gender = atom<number | undefined>({
  key: 'gender',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const houseCategoryId = atom<number | undefined>({
  key: 'houseCategoryId',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const houseOtherInfo = atom<string | undefined>({
  key: 'houseOtherInfo',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const tempaddress = atom<string>({
  key: 'address',
  default: '0',
  effects_UNSTABLE: [persistAtom],
});

export const tempfile = atom<any>({
  key: 'tempfile',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const realfile = atom<any>({
  key: 'realfile',
  default: {},
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [persistAtom],
});

export const previewAtom = atom<string[]>({
  key: 'preview',
  default: [],
  //effects_UNSTABLE: [persistAtom],
});

export const isEditingAtom = atom<Boolean>({
  key: 'isEditing',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
