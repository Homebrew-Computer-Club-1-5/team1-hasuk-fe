import * as S from './Location.styled';
import InputTemplate from '../../components/molecules/InputTemplate';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import WhitePill from '../../components/molecules/WhitePill';
import { useRecoilState } from 'recoil';
import { status, information, Iinfo } from './atoms';
import { useForm, useFormState } from 'react-hook-form';
import { useState } from 'react';
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
      </div>
    </S.Wrapper>
  );
}
export default Location;
