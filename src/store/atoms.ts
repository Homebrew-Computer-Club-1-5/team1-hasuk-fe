import { atom } from 'recoil';

interface IhouseData_fetchHousesByRegion {
  id: number;
  month_cost: number;
  nearest_main_spot_name: string;
  img_urls: Iimg_url[];
  gender: number;
  has_empty: boolean;
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
  cost: Icost;
  house_location: Ihouse_location;
  imgs: Ihouse_img[];
  region: Iregion;
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
}
interface Icost {
  month_cost: number;
  deposit: number;
  cost_other_info: string;
}

interface ImainHouse {
  name: string;
  id: number;
  houses: Ihouse_object[];
}
export interface Ihouse_object {
  house_location: Ihouse_location;
}
export const houseDatasAtom = atom<IhouseData_fetchHousesByRegion[]>({
  key: 'houseDatas',
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
