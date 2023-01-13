import { atom } from 'recoil';

interface IhouseData {
  house_id: number;
  month_cost: number;
  house_name: string;
  main_spot_name: string;
  img_url: string[];
  gender: number;
  has_empty: boolean;
}

export const houseDatasAtom = atom<IhouseData[]>({
  key: 'houseDatas',
  default: [
    {
      house_id: 11,
      house_name: '1구역 1번집',
      month_cost: 10,
      main_spot_name: '1-1 에서 가까운 카페',
      img_url: [
        'https://img.koreapas.com/i/61ddf4a/resize',
        'https://img.koreapas.com/i/a86267b/resize',
      ],
      gender: 1,
      has_empty: true,
    },
    {
      house_id: 12,
      house_name: '1구역 2번집',
      month_cost: 30,
      main_spot_name: '1-2 에서 가까운 카페',
      img_url: [
        'https://img.koreapas.com/i/61ddf4a/resize',
        'https://img.koreapas.com/i/a86267b/resize',
      ],
      gender: 1,
      has_empty: true,
    },
  ],
});
