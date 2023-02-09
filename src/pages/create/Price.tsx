import WhitePill from '../../components/molecules/WhitePill';
import { useForm } from 'react-hook-form';
import InputTemplate from '../../components/molecules/InputTemplate';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import * as S from './Price.styled';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import {
  statusAtom,
  monthCostAtom,
  depositAtom,
  costOtherInfoAtom,
} from '../../store/atoms';

const NoticeTextWrapperStyle = {
  paddingTop: '0px',
  marginTop: '0px',
  textAlign: 'center',
};

const whitePillStyle = {
  marginTop: '30px',
};

function Price() {
  const [stat, setStat] = useRecoilState(statusAtom);
  const [month, setMonth] = useRecoilState(monthCostAtom);

  const [depo, setDepo] = useRecoilState(depositAtom);
  const [cost, setCost] = useRecoilState(costOtherInfoAtom);
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
    setDepo(tempdepo ? tempdepo : depo);
    setMonth(tempmonth ? tempmonth : month);
    setCost(tempcost ? tempcost : cost);
  }, [tempdepo, tempmonth, tempcost, depo, month, cost]);

  const onValid = () => {
    setStat({ status: 4 });
  };

  return (
    <S.Container>
      <S.NumberH1>{stat.status}/5</S.NumberH1>
      <NoticeTextWrapper style={NoticeTextWrapperStyle as any} fontSize="23px">
        가격 관련 정보를 알려주세요.
      </NoticeTextWrapper>
      <S.Form onSubmit={handleSubmit(onValid)}>
        <S.InputWrapper>
          <S.TitleP>월세</S.TitleP>
          <InputTemplate
            multipleLines={false}
            width="200px"
            placeholderText=""
            registerObject={register('month', {
              required: '월세를 입력해 주세요',
              pattern: {
                value: /^([0-9]?|)\d{1,4}$/,
                message: '숫자로만 입력해 주세요',
              },
              validate: {
                nozero: (value) =>
                  Number(value) === Number(0) || value === undefined
                    ? '올바른 값을 입력해주세요'
                    : true,
              },
              onChange: (e: any) => setTempMonth(e.target.value),
            })}
          >
            <S.InnerP>만원/월</S.InnerP>
          </InputTemplate>
        </S.InputWrapper>
        <S.ErrorSpan>{errors?.month?.message}</S.ErrorSpan>

        <S.InputWrapper>
          <S.TitleP>보증금 (없으면 0이라고 써주세요)</S.TitleP>
          <InputTemplate
            multipleLines={false}
            width="200px"
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
            <S.InnerP>만원</S.InnerP>
          </InputTemplate>
        </S.InputWrapper>
        <S.ErrorSpan>{errors?.deposit?.message}</S.ErrorSpan>

        <S.InputWrapper>
          <S.TitleP>공과금(수도세, 인터넷, 난방비, 전깃세 등)</S.TitleP>
          <InputTemplate
            multipleLines={true}
            fontsize={15}
            width="200px"
            placeholderText=""
            registerObject={register('cost_other_info', {
              required: false,
              onChange: (e: any) => setTempcost(e.target.value),
            })}
          />
        </S.InputWrapper>

        <WhitePill
          style={whitePillStyle}
          text={'다음'}
          onClickNavigator={() => {}}
        />
      </S.Form>
    </S.Container>
  );
}

export default Price;
