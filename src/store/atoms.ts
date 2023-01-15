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
export const houseDatasAtom = atom<IhouseData_fetchHousesByRegion[]>({
  key: 'houseDatas',
  default: [
    // {
    //   house_id: 11,
    //   house_name: '1구역 1번집',
    //   month_cost: 10,
    //   main_spot_name: '1-1 에서 가까운 카페',
    //   img_url: [
    //     'https://img.koreapas.com/i/61ddf4a/resize',
    //     'https://img.koreapas.com/i/a86267b/resize',
    //   ],
    //   gender: 1,
    //   has_empty: true,
    // },
    // {
    //   house_id: 12,
    //   house_name: '1구역 2번집',
    //   month_cost: 30,
    //   main_spot_name: '1-2 에서 가까운 카페',
    //   img_url: [
    //     'https://img.koreapas.com/i/61ddf4a/resize',
    //     'https://img.koreapas.com/i/a86267b/resize',
    //   ],
    //   gender: 1,
    //   has_empty: true,
    // },
  ],
});

export const houseDataAtom = atom<IhouseData_fetchHouse>({
  key: 'houseData',
  default: {} as any,
});
