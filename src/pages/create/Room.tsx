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
      <NoticeTextWrapper style={NoticeTextWrapperStyle} fontSize="25px">
        방 관련 정보를 알려주세요.
      </NoticeTextWrapper>
      <div className="radioWrapper">
        <p>성별</p>
        <PillRadio
          def={gen ? gen : undefined}
          getRadioValue={getGenderValue}
          stuff={[
            {
              text: '남성 전용',
              value: 0,
            },
            {
              text: '여성 전용',
              value: 1,
            },
            {
              text: '남녀 공용',
              value: 2,
            },
          ]}
        />
      </div>
      <div className="radioWrapper">
        <p>카테고리</p>
        <PillRadio
          def={cat ? cat : undefined}
          getRadioValue={getCategoryValue}
          stuff={[
            {
              text: '하숙',
              value: 2,
            },
            {
              text: '원룸/자취방',
              value: 3,
            },

            {
              text: '고시원',
              value: 4,
            },
            {
              text: '기타',
              value: 5,
            },
          ]}
        />
      </div>
      <div className="otherInfoWrapper">
        <p>기타 정보</p>
        <p className="extra">
          팁: 식사조건, 빨래제공, 화장실 공용여부 최소거주기간, 채광
        </p>

        <form onSubmit={handleSubmit(onValid)}>
          <InputTemplate
            multipleLines={true}
            height={150}
            fontsize={15}
            placeholderText=""
            registerObject={register('other', {
              onChange: (e: any) => setTempother(e.target.value),
            })}
          />

          <WhitePill
            style={whitePillStyle}
            text={'다음'}
            onClickNavigator={() => {
              if (gen !== 0 && cat !== 0) {
                onValid();
                setStat({ status: 5 });
              } else {
                alert('성별과 카테고리를 선택해주세요');
                return;
              }
            }}
          />
        </form>
      </div>
    </S.Wrapper>
  );
}
export default Room;
