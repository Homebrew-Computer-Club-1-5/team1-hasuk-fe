import PillRadio from '../../components/molecules/PillRadio';

import InputTemplate from '../../components/molecules/InputTemplate';
import WhitePill from '../../components/molecules/WhitePill';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import { useRecoilState } from 'recoil';
import {
  statusAtom,
  genderAtom,
  houseCategoryIdAtom,
  houseOtherInfoAtom,
} from '../../store/atoms';
import { useState, useEffect } from 'react';
import * as S from './Room.styled';
import { useForm } from 'react-hook-form';

function Room() {
  const [stat, setStat] = useRecoilState(statusAtom);
  const [gen, setGen] = useRecoilState(genderAtom);
  const [cat, setCat] = useRecoilState(houseCategoryIdAtom);
  const [other, setOther] = useRecoilState(houseOtherInfoAtom);
  const [tempother, setTempother] = useState();
  const [tempgen, setTempgen] = useState();
  const [tempcat, setTempcat] = useState();
  const { register, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: { other: other },
  });
  const getGenderValue = (x: any) => {
    setTempgen(x);
  };
  const getCategoryValue = (x: any) => {
    setTempcat(x);
  };
  const onValid = () => {
    if (tempother) {
      setOther(tempother);
    } else {
      setOther(other);
    }
  };

  const NoticeTextWrapperStyle = {
    paddingTop: '0px',
    marginTop: '0px',
    fontSize: '24px !important',
  };

  const whitePillStyle = {
    marginTop: '30px',
  };
  useEffect(() => {
    setGen(tempgen ? tempgen : gen);
    setCat(tempcat ? tempcat : cat);
  }, [tempgen, tempcat]);

  return (
    <S.Container>
      <S.NumberH1>{stat.status}/5</S.NumberH1>
      <NoticeTextWrapper style={NoticeTextWrapperStyle} fontSize="25px">
        방 관련 정보를 알려주세요.
      </NoticeTextWrapper>
      <S.RadioWrapper>
        <S.TitleP>성별</S.TitleP>
        <PillRadio
          defaultValue={gen ? gen : undefined}
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
      </S.RadioWrapper>
      <S.RadioWrapper>
        <S.TitleP>카테고리</S.TitleP>
        <PillRadio
          defaultValue={cat ? cat : undefined}
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
      </S.RadioWrapper>
      <S.OtherInfoWrapper>
        <S.TitleP>기타 정보</S.TitleP>
        <S.ExtraP>
          팁: 식사조건, 빨래제공, 화장실 공용여부 최소거주기간, 채광
        </S.ExtraP>

        <S.Form>
          <InputTemplate
            multipleLines={true}
            fontsize={15}
            placeholderText=""
            registerObject={register('other', {
              onChange: (e: any) => setTempother(e.target.value),
            })}
          />

          <WhitePill
            style={whitePillStyle}
            text={'다음'}
            onClick={() => {
              if (gen !== 0 && cat !== 0) {
                onValid();
                setStat({ status: 5 });
              } else {
                alert('성별과 카테고리를 선택해주세요');
                return;
              }
            }}
          />
        </S.Form>
      </S.OtherInfoWrapper>
    </S.Container>
  );
}
export default Room;
