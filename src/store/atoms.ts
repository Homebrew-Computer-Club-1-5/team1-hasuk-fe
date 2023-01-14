import { atom } from 'recoil';

interface IhouseData_ForHouses {
  house_id: string;
  house_name: string;
  month_cost: number;
  main_spot_name: string;
  img_url: string[];
  gender: number;
  has_empty: boolean;
} // 필수 비필수 설정 해줘야함

interface IhouseData_ForHouse {
  house_id: number;
  house_name: string;
  contact_number: string;
  gender: number;
  min_residence: string;
  house_other_info: string;
  has_empty: boolean;
  house_location: Ihouse_location;
  cost: Icost;
  category_name: string;
  img_url: string[];
  region_id: number;
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
export const houseDatasAtom = atom<IhouseData_ForHouses[]>({
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

export const houseDataAtom = atom<IhouseData_ForHouse>({
  key: 'houseData',
  default: {} as any,
});
