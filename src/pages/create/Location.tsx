import * as S from './Location.styled';
import InputTemplate from '../../components/molecules/InputTemplate';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import WhitePill from '../../components/molecules/WhitePill';
import { useRecoilState } from 'recoil';
import { status, information, IhouseData } from './atoms';
import { useForm, useFormState } from 'react-hook-form';
import { useState } from 'react';
import Selectbox from '../../components/molecules/Selectbox';
import PillRadio from '../../components/molecules/PillRadio';
import AddressMaker from '../../components/molecules/AddressMaker';
import { useEffect } from 'react';
function Location() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IhouseData>();
  const [stat, setStat] = useRecoilState(status);
  const [location, setLocation] = useRecoilState(information);
  const [radio, setRadio] = useState();
  const [select, setSelect] = useState();
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const getRadioValue = (x: any) => {
    setRadio(x);
  };
  const getSelectValue = (x: any) => {
    setSelect(x);
  };
  const getCoordsValue = (x: any) => {
    setCoords(x);
  };
  const newInfo = {
    contact_number: location.contact_number,
    university_id: location.university_id,
    region_id: location.region_id,
    latitude: location.latitude,
    longitude: location.longitude,
    month_cost: location.month_cost,
    deposit: location.deposit,
    cost_other_info: location.cost_other_info,
    gender: location.gender,
    house_category_id: location.house_category_id,
    house_other_info: location.house_other_info,
  };
  useEffect(() => {
    newInfo.region_id = radio;
    newInfo.university_id = select;
    newInfo.latitude = coords.latitude;
    newInfo.longitude = coords.longitude;
  }, [radio, select, coords]);

  return (
    <S.Wrapper>
      <div id="textPlace">
        <h1>{stat.status}/5</h1>
        <NoticeTextWrapper>위치 정보를 입력해 주세요.</NoticeTextWrapper>
        <p>대학</p>
        <Selectbox
          getSelectValue={getSelectValue}
          stuff={[
            { text: '선택하세요', value: 0, defaultValue: true },
            {
              text: '고려대',
              value: 1,
              defaultValue: Number(location.university_id) === 1 ? true : false,
            },
          ]}
        ></Selectbox>
        <PillRadio
          getRadioValue={getRadioValue}
          stuff={[
            {
              text: '성신여대',
              value: 1,
            },
            {
              text: '안암역',
              value: 2,
            },
            {
              text: '제기동',
              value: 3,
            },
            {
              text: '고대정문',
              value: 4,
            },
          ]}
        />
        <AddressMaker getCoordsValue={getCoordsValue} />
        <WhitePill
          text={'다음'}
          onClickNavigator={() => {
            if (
              (newInfo.region_id &&
                newInfo.university_id &&
                newInfo.latitude &&
                newInfo.longitude) ||
              (location.region_id &&
                location.university_id &&
                location.latitude &&
                location.longitude)
            ) {
              setLocation({ ...newInfo });
              setStat({ status: 2 });
            }
          }}
        />
      </div>
    </S.Wrapper>
  );
}
export default Location;
