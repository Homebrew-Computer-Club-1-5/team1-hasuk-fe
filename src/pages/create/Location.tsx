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
function Location() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<Iinfo>();
  const [stat, setStat] = useRecoilState(status);

  return (
    <S.Wrapper>
      <div id="textPlace">
        <h1>{stat.status}/5</h1>
        <NoticeTextWrapper>위치 정보를 입력해 주세요.</NoticeTextWrapper>
        <Selectbox textList={['선택하세요', '고려대']}></Selectbox>
        <PillRadio
          stuff={[
            { text: '성신여대', value: 1 },
            { text: '안암역', value: 2 },
            { text: '제기동', value: 3 },
            { text: '고대정문', value: 4 },
          ]}
        />
      </div>
    </S.Wrapper>
  );
}
export default Location;
