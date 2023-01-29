import InputTemplate from '../../components/molecules/InputTemplate';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import WhitePill from '../../components/molecules/WhitePill';
import * as S from './Tel.styled';
import { useRecoilState } from 'recoil';
import { status, information, IhouseData } from './atoms';
import { useForm, useFormState } from 'react-hook-form';
import { useState } from 'react';
function RegisterStart() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IhouseData>();
  const [stat, setStat] = useRecoilState(status);
  const [tel, setTel] = useRecoilState(information);
  const [temp, setTemp] = useState();
  const newInfo = {
    contact_number: tel.contact_number,
    university_id: tel.university_id,
    region_id: tel.region_id,
    latitude: tel.latitude,
    longitude: tel.longitude,
    month_cost: tel.month_cost,
    deposit: tel.deposit,
    cost_other_info: tel.cost_other_info,
    gender: tel.gender,
    house_category_id: tel.house_category_id,
    house_other_info: tel.house_other_info,
  };

  const onChangeTel = (e: any) => {
    setTemp(e.target.value);
  };

  const onValid = () => {
    newInfo.contact_number = temp;
    setStat({ status: 3 });
    setTel({ ...newInfo });
    console.log(tel);
  };
  const onInvalid = () => {
    return errors?.contact_number?.message;
  };
  return (
    <S.Wrapper>
      <div id="textPlace">
        <h1>{stat.status}/5</h1>
        <NoticeTextWrapper>
          연락 받으실 연락처를 입력해 주세요.
        </NoticeTextWrapper>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <InputTemplate
            defaultValue={tel.contact_number ? tel.contact_number : ''}
            placeholderText="010-1234-5678"
            registerObject={register('contact_number', {
              required: '전화번호가 필요합니다',
              pattern: {
                value: /^([-\s]?|)\d{2,3}[-\s]?\d{3,4}[-\s]?\d{4}$/,
                message: '올바른 형식으로 입력해주세요',
              },
              onChange: onChangeTel,
            })}
          />
          {onInvalid() ? <span>{onInvalid()}</span> : null}
          <div>
            <WhitePill text={'다음'} onClickNavigator={() => {}} />
          </div>
        </form>
      </div>
    </S.Wrapper>
  );
}

export default RegisterStart;
