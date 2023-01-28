import * as S from './Location.styled';
import InputTemplate from '../../components/molecules/InputTemplate';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import WhitePill from '../../components/molecules/WhitePill';
import { useRecoilState } from 'recoil';
import { status, information, Iinfo } from './atoms';
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
  } = useForm<Iinfo>();
  const [stat, setStat] = useRecoilState(status);
  const [location, setLocation] = useRecoilState(information);
  const [radio, setRadio] = useState();
  const [select, setSelect] = useState();
  const getRadioValue = (x: any) => {
    console.log(x, '라디오값');
    setRadio(x);
  };
  const getSelectValue = (x: any) => {
    console.log(x, '셀렉트값');
    setSelect(x);
  };
  const newInfo = {
    tel: location.tel,
    univ: location.univ,
    area: location.area,
    address: location.address,
    latitude: location.latitude,
    longitude: location.longitude,
    monthly: location.monthly,
    deposit: location.deposit,
    fee: location.fee,
    gender: location.gender,
    category: location.category,
    etc: location.etc,
  };
  useEffect(() => {
    newInfo.area = radio;
    newInfo.univ = select;
  }, [radio, select]);

  return (
    <S.Wrapper>
      <div id="textPlace">
        <h1>{stat.status}/5</h1>
        <NoticeTextWrapper>위치 정보를 입력해 주세요.</NoticeTextWrapper>
        <Selectbox
          getSelectValue={getSelectValue}
          stuff={[
            { text: '선택하세요', value: 0 },
            { text: '고려대', value: 1 },
          ]}
        ></Selectbox>
        <PillRadio
          getRadioValue={getRadioValue}
          stuff={[
            { text: '성신여대', value: 1 },
            { text: '안암역', value: 2 },
            { text: '제기동', value: 3 },
            { text: '고대정문', value: 4 },
          ]}
        />
        <AddressMaker />
        <WhitePill
          text={'다음'}
          onClickNavigator={() => {
            console.log(newInfo);
            if (newInfo.area && newInfo.univ) {
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
