import PillRadio from '../../components/molecules/PillRadio';

import InputTemplate from '../../components/molecules/InputTemplate';
import WhitePill from '../../components/molecules/WhitePill';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import { useRecoilState } from 'recoil';
import { status, information, IhouseData } from './atoms';
import { useState, useEffect } from 'react';
import * as S from './Room.styled';
import { useForm } from 'react-hook-form';
function Room() {
  const { register, handleSubmit } = useForm<IhouseData>();
  const [stat, setStat] = useRecoilState(status);
  const [room, setRoom] = useRecoilState(information);
  const [etcInfo, setEtcInfo] = useState();
  const [gender, setGender] = useState();
  const [category, setCategory] = useState();
  const getGenderValue = (x: any) => {
    setGender(x);
  };
  const getCategoryValue = (x: any) => {
    setCategory(x);
  };
  const onChangeEtc = (e: any) => {
    setEtcInfo(e.target.value);
  };
  const inputStyle = {
    width: '300px',
    height: '50px',
    borderRadius: '10px',
    padding: '10px 15px',
    backgroundColor: '#e4e4e4',
  };

  const newInfo = {
    contact_number: room.contact_number,
    university_id: room.university_id,
    region_id: room.region_id,
    latitude: room.latitude,
    longitude: room.longitude,
    month_cost: room.month_cost,
    deposit: room.deposit,
    cost_other_info: room.cost_other_info,
    gender: room.gender,
    house_category_id: room.house_category_id,
    house_other_info: room.house_other_info,
  };
  useEffect(() => {
    newInfo.gender = gender;
    newInfo.house_category_id = category;
    newInfo.house_other_info = etcInfo;
  }, [gender, category, etcInfo]);

  return (
    <S.Wrapper>
      <h1>{stat.status}/5</h1>
      <NoticeTextWrapper>방 관련 정보를 알려주세요.</NoticeTextWrapper>
      <p>성별</p>
      <PillRadio
        getRadioValue={getGenderValue}
        stuff={[
          {
            text: '남성 전용',
            value: 1,
          },
          {
            text: '여성 전용',
            value: 2,
          },
          {
            text: '남녀 공용',
            value: 3,
          },
        ]}
      />
      <p>카테고리</p>
      <PillRadio
        getRadioValue={getCategoryValue}
        stuff={[
          {
            text: '원룸/투룸/자취방',
            value: 1,
          },
          {
            text: '하숙',
            value: 2,
          },
          {
            text: '고시원',
            value: 3,
          },
          {
            text: '기타',
            value: 4,
          },
        ]}
      />
      <p>기타 정보</p>
      <p>팁: 식사조건, 빨래제공, 화장실 공용여부, 최소거주기간, 채광</p>
      <input
        value={room.house_other_info ? room.house_other_info : undefined}
        style={inputStyle}
        onChange={onChangeEtc}
      />

      <WhitePill
        text={'다음'}
        onClickNavigator={() => {
          if (
            (newInfo.gender &&
              newInfo.house_category_id &&
              newInfo.house_other_info) ||
            (room.gender && room.house_category_id && room.house_other_info)
          ) {
            setRoom({ ...newInfo });
            setStat({ status: 5 });
          }
        }}
      />
    </S.Wrapper>
  );
}
export default Room;
