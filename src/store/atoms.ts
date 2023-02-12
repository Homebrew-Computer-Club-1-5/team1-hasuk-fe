import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export interface IhouseData_fetchAllHouses {
  id: number;
  gender: number | null;
  board_date: number;
  region: {
    id: number;
    name: string;
  } | null;
  house_cost: {
    month_cost: number;
  } | null;
  imgs: {
    img_url: string;
  }[];
  house_category: {
    id: number;
    name: string;
  } | null;
}

export interface IhouseData_fetchHousesByRegion {
  region_name: string;
  id: number;
  month_cost: number;
  nearest_main_spot_name: string;
  img_urls: string[];
  gender: number;
  has_empty: boolean;
  house_category_id: number;
  board_date: string; // 야매
} // 필수 비필수 설정 해줘야함

interface Iimg_url {
  img_url: string;
}

interface IhouseData_fetchHouse {
  id: number;
  contact_number: string;
  gender: number;
  min_residence: string;
  house_other_info: string;
  has_empty: number;
  is_crolled: number;
  house_cost: Icost;
  house_location: Ihouse_location;
  house_category: Ihouse_category;
  imgs: Ihouse_img[];
  region: Iregion;
}

interface Ihouse_category {
  name: string;
  id: number;
}

interface Iregion {
  id: number;
}

interface Ihouse_img {
  img_url: string;
}
export interface Ihouse_location {
  latitude: number;
  longitude: number;
  houseId: number;
  id: number;
}
interface Icost {
  month_cost: number;
  deposit: number;
  other_info: string;
}

interface ImainHouse {
  name: string;
  id: number;
  houses: Ihouse_object[];
}

interface ILogin_datasAtom {
  contact_number: string;
}
export interface IfetchMyHouse {
  id: number;
  img_urls: string[];
  contact_number: string;
  gender: number;
  house_other_info: string;
  region: number;
  cost: Icost;
  house_category: number;
  location: Ihouse_location2;
  board_date: number;
}

interface Ihouse_location2 {
  latitude: number;
  longitude: number;
}

interface IfetchCrawledHouses {
  id: number;
  img_urls: string[];
  house_category: number;
}
export interface Ihouse_object {
  id: number;
  house_category: Ihouse_category;
  house_location: Ihouse_location;
}
export const houseDatasAtom = atom<IhouseData_fetchHousesByRegion[]>({
  key: 'houseDatas',
  default: [],
});

export const houseDatas2Atom = atom<IhouseData_fetchAllHouses[]>({
  key: 'houseDatas2',
  default: [],
});

export const isHousesFirstLoadedAtom = atom<boolean>({
  key: 'isHousesFirstLoaded',
  default: true,
});

export const isHousesFirstLoaded2Atom = atom<boolean>({
  key: 'isHousesFirstLoaded2',
  default: true,
});

export const filteredHouseDatasAtom = atom<IhouseData_fetchHousesByRegion[]>({
  key: 'filteredHouseDatas',
  default: [],
});

export const filteredHouseDatas2Atom = atom<IhouseData_fetchAllHouses[]>({
  key: 'filteredHouseDatas2',
  default: [],
});

//useState의 default값과 동일한 기능
export const houseDataAtom = atom<IhouseData_fetchHouse>({
  key: 'houseData',
  default: {} as any,
});

export const mainHousesAtom = atom<ImainHouse[]>({
  key: 'mainHouses',
  default: [],
});

export const Login_datasAtom = atom<ILogin_datasAtom>({
  key: 'Login_datas',
  default: {} as any,
});

export const fetchMyHouseAtom = atom<IfetchMyHouse[]>({
  key: 'fetchMyHouse',
  default: [] as any,
});

export const clickedHouse_idAtom = atom<number>({
  key: 'clickedHouse_id',
  default: 0,
});

export const fetchCrawledHousesAtom = atom<IfetchCrawledHouses[]>({
  key: 'fetchCrawledHouses',
  default: [],
});

export const myHouseAddressAtom = atom<string>({
  key: 'myHouseAddress',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export interface IStates {
  status: number;
}
export interface IPreview {
  link: string;
}

export const statusAtom = atom<IStates>({
  key: 'status',
  default: { status: 0 },
  effects_UNSTABLE: [persistAtom],
});

export const contactNumberAtom = atom<string | undefined>({
  key: 'contactNumber',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const universityIdAtom = atom<number | undefined>({
  key: 'universityId',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const regionIdAtom = atom<number | undefined>({
  key: 'regionId',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const latitudeAtom = atom<number>({
  key: 'latitude',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const longitudeAtom = atom<number>({
  key: 'longitude',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const monthCostAtom = atom<number | undefined>({
  key: 'monthCost',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const depositAtom = atom<number | undefined>({
  key: 'deposit',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const costOtherInfoAtom = atom<string | undefined>({
  key: 'costOtherInfo',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
export const genderAtom = atom<number | undefined>({
  key: 'gender',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const houseCategoryIdAtom = atom<number | undefined>({
  key: 'houseCategoryId',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const houseOtherInfoAtom = atom<string | undefined>({
  key: 'houseOtherInfo',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const tempaddressAtom = atom<string>({
  key: 'address',
  default: '0',
  effects_UNSTABLE: [persistAtom],
});

export const tempfileAtom = atom<any>({
  key: 'tempfile',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const countfileAtom = atom<number>({
  key: 'countfile',
  default: 0,
  dangerouslyAllowMutability: true,
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

export const isGetIdxValueSuccessAtom = atom<Boolean>({
  key: 'isGetIdxValueSuccess',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const innerpreviewAfterIdxDBAtom = atom<string[]>({
  key: 'innerpreviewAfterIdxDB',
  default: [],
});

export const isCurrentLocationButtonClickedAtom = atom<boolean>({
  key: 'isCurrentLocationButtonClicked',
  default: false,
});

interface IcurrentLocation {
  longitude: number;
  latitude: number;
}
export const currentLocationAtom = atom<IcurrentLocation>({
  key: 'currentLocation',
  default: {} as any,
});

export const isUppingAtom = atom<Boolean>({
  key: 'isUpping',
  default: false,
});

export const googleLinkAtom = atom<string[]>({
  key: 'googleLink',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const googleLinkCountAtom = atom<number>({
  key: 'googleLinkCount',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
