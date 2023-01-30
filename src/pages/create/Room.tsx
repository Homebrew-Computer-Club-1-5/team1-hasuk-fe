import PillRadio from '../../components/molecules/PillRadio';

import InputTemplate from '../../components/molecules/InputTemplate';
import WhitePill from '../../components/molecules/WhitePill';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import { useRecoilState } from 'recoil';
import { status, gender, houseCategoryId, houseOtherInfo } from './atoms';
import { useState, useEffect } from 'react';
import * as S from './Room.styled';
import { useForm } from 'react-hook-form';
function Room() {
  const [stat, setStat] = useRecoilState(status);
  const [gen, setGen] = useRecoilState(gender);
  const [cat, setCat] = useRecoilState(houseCategoryId);
  const [other, setOther] = useRecoilState(houseOtherInfo);

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

    setStat({ status: 5 });
  };
  const inputStyle = {
    width: '300px',
    height: '50px',
    borderRadius: '10px',
    padding: '10px 15px',
    backgroundColor: '#e4e4e4',
  };

  useEffect(() => {
    if (tempgen) {
      setGen(tempgen);
    }
    if (tempcat) {
      setCat(tempcat);
    } else {
      setGen(gen);
      setCat(cat);
    }
  }, [tempgen, tempcat]);

  return (
    <S.Wrapper>
      <h1>{stat.status}/5</h1>
      <NoticeTextWrapper>방 관련 정보를 알려주세요.</NoticeTextWrapper>
      <p>성별</p>
      <PillRadio
        def={gen ? gen : undefined}
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
        def={cat ? cat : undefined}
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
      <form onSubmit={handleSubmit(onValid)}>
        <InputTemplate
          placeholderText=""
          registerObject={register('other', {
            onChange: (e: any) => setTempother(e.target.value),
          })}
        />

        <WhitePill text={'다음'} onClickNavigator={() => {}} />
      </form>
    </S.Wrapper>
  );
}
export default Room;
