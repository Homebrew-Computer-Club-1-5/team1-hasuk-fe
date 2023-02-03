import WhitePill from '../../components/molecules/WhitePill';
import { useForm } from 'react-hook-form';
import InputTemplate from '../../components/molecules/InputTemplate';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import * as S from './Price.styled';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { status, monthCost, deposit, costOtherInfo } from './atoms';

const NoticeTextWrapperStyle = {
  paddingTop: '0px',
  marginTop: '0px',
  textAlign: 'center',
};

const whitePillStyle = {
  marginTop: '30px',
};

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
    setDepo(tempdepo ? tempdepo : depo);
    setMonth(tempmonth ? tempmonth : month);
    setCost(tempcost ? tempcost : cost);
  }, [tempdepo, tempmonth, tempcost, depo, month, cost]);

  const onValid = () => {
    setStat({ status: 4 });
  };

  return (
    <S.Wrapper>
      <h1>{stat.status}/5</h1>
      <NoticeTextWrapper style={NoticeTextWrapperStyle as any} fontSize="23px">
        가격 관련 정보를 알려주세요.
      </NoticeTextWrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="monthCostWrapper">
          <p>월세</p>
          <InputTemplate
            multipleLines={false}
            width={200}
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
            <p
              style={{
                //position: 'absolute',
                marginTop: '-40px',
                marginLeft: '75%',
              }}
            >
              만원/월
            </p>
          </InputTemplate>
        </div>
        <span>{errors?.month?.message}</span>

        <div className="monthCostWrapper">
          <p>보증금 (없으면 0이라고 써주세요)</p>
          <InputTemplate
            multipleLines={false}
            width={200}
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
                marginLeft: '65%',
              }}
            >
              만원
            </p>
          </InputTemplate>
        </div>
        <span>{errors?.deposit?.message}</span>

        <div className="monthCostWrapper">
          <p>공과금(수도세, 인터넷, 난방비, 전깃세 등)</p>
          <InputTemplate
            multipleLines={true}
            fontsize={15}
            width={200}
            placeholderText=""
            registerObject={register('cost_other_info', {
              required: false,
              onChange: (e: any) => setTempcost(e.target.value),
            })}
          />
        </div>
        <div>
          <WhitePill
            style={whitePillStyle}
            text={'다음'}
            onClickNavigator={() => {}}
          />
        </div>
      </form>
    </S.Wrapper>
  );
}

export default Price;
