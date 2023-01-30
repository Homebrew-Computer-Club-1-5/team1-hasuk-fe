import WhitePill from '../../components/molecules/WhitePill';
import { useForm } from 'react-hook-form';
import InputTemplate from '../../components/molecules/InputTemplate';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import * as S from './Price.styled';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { status, monthCost, deposit, costOtherInfo } from './atoms';

function Price() {
  const [stat, setStat] = useRecoilState(status);
  const [month, setMonth] = useRecoilState(monthCost);

  const [depo, setDepo] = useRecoilState(deposit);
  const [cost, setCost] = useRecoilState(costOtherInfo);
  const [tempmonth, setTempMonth] = useState();
  const [tempdepo, setTempdepo] = useState();
  const [tempcost, setTempcost] = useState();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: { month: month, deposit: depo, cost_other_info: cost },
  });

  useEffect(() => {
    if (tempdepo) {
      setDepo(tempdepo);
    }
    if (tempmonth) {
      setMonth(tempmonth);
    }
    if (tempcost) {
      setCost(tempcost);
    } else {
      setDepo(depo);
      setMonth(month);
      setCost(cost);
    }
  }, [tempdepo, tempmonth, tempcost]);

  const onValid = () => {
    setStat({ status: 4 });
  };

  return (
    <S.Wrapper>
      <h1>{stat.status}/5</h1>
      <NoticeTextWrapper>가격 관련 정보를 알려주세요.</NoticeTextWrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <p>월세</p>
        <InputTemplate
          placeholderText=""
          registerObject={register('month', {
            required: '월세를 입력해 주세요',
            pattern: {
              value: /^([0-9]?|)\d{1,4}$/,
              message: '숫자로만 입력해 주세요',
            },
            onChange: (e: any) => setTempMonth(e.target.value),
          })}
        >
          <p
            style={{
              position: 'absolute',
              marginTop: '-40px',
              marginLeft: '75%',
            }}
          >
            만원/월
          </p>
        </InputTemplate>
        <span>{errors?.month?.message}</span>
        <p>보증금</p>
        <InputTemplate
          placeholderText=""
          registerObject={register('deposit', {
            required: '보증금을 입력해 주세요',
            pattern: {
              value: /^([0-9]?|)\d{1,4}$/,
              message: '숫자로만 입력해 주세요',
            },
            onChange: (e: any) => setTempdepo(e.target.value),
          })}
        >
          <p
            style={{
              position: 'absolute',
              marginTop: '-40px',
              marginLeft: '80%',
            }}
          >
            만원
          </p>
        </InputTemplate>
        <span>{errors?.deposit?.message}</span>
        <p>공과금(수도세, 인터넷, 난방비, 전깃세, 에어컨비 등)</p>
        <InputTemplate
          placeholderText=""
          registerObject={register('cost_other_info', {
            required: false,
            onChange: (e: any) => setTempcost(e.target.value),
          })}
        />
        <div>
          <WhitePill text={'다음'} onClickNavigator={() => {}} />
        </div>
      </form>
    </S.Wrapper>
  );
}

export default Price;
