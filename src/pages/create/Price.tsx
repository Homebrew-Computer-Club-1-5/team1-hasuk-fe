import WhitePill from '../../components/molecules/WhitePill';
import { useForm } from 'react-hook-form';
import InputTemplate from '../../components/molecules/InputTemplate';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import * as S from './Price.styled';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { status, information, IhouseData } from './atoms';

function Price() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IhouseData>();
  const [stat, setStat] = useRecoilState(status);
  const [price, setPrice] = useRecoilState(information);
  const [month, setMonth] = useState();
  const [deposit, setDeposit] = useState();
  const [cost, setCost] = useState();
  const newInfo = {
    contact_number: price.contact_number,
    university_id: price.university_id,
    region_id: price.region_id,
    latitude: price.latitude,
    longitude: price.longitude,
    month_cost: price.month_cost,
    deposit: price.deposit,
    cost_other_info: price.cost_other_info,
    gender: price.gender,
    house_category_id: price.house_category_id,
    house_other_info: price.house_other_info,
  };

  const onValid = () => {
    newInfo.month_cost = month;
    newInfo.deposit = deposit;
    newInfo.cost_other_info = cost;
    setPrice({ ...newInfo });
    setStat({ status: 4 });
  };

  return (
    <S.Wrapper>
      <h1>{stat.status}/5</h1>
      <NoticeTextWrapper>가격 관련 정보를 알려주세요.</NoticeTextWrapper>
      <form onSubmit={handleSubmit(onValid)}>
        <p>월세</p>
        <InputTemplate
          defaultValue={price.month_cost ? price.month_cost : ''}
          placeholderText=""
          registerObject={register('month_cost', {
            required: '월세를 입력해 주세요',
            pattern: {
              value: /^([0-9]?|)\d{1,4}$/,
              message: '숫자로만 입력해 주세요',
            },
            onChange: (e: any) => setMonth(e.target.value),
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
        <span>{errors?.month_cost?.message}</span>
        <p>보증금</p>
        <InputTemplate
          defaultValue={price.deposit ? price.deposit : ''}
          placeholderText=""
          registerObject={register('deposit', {
            required: '보증금을 입력해 주세요',
            pattern: {
              value: /^([0-9]?|)\d{1,4}$/,
              message: '숫자로만 입력해 주세요',
            },
            onChange: (e: any) => setDeposit(e.target.value),
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
          defaultValue={price.cost_other_info ? price.cost_other_info : ''}
          placeholderText=""
          registerObject={register('cost_other_info', {
            required: false,
            onChange: (e: any) => setCost(e.target.value),
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
