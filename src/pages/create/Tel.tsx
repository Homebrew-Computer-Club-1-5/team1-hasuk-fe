import InputTemplate from '../../components/molecules/InputTemplate';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import WhitePill from '../../components/molecules/WhitePill';
import * as S from './Tel.styled';
import { useRecoilState } from 'recoil';
import { status, information, Iinfo } from './atoms';
import { useForm, useFormState } from 'react-hook-form';
import { useState } from 'react';
function RegisterStart() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<Iinfo>();
  const [stat, setStat] = useRecoilState(status);
  const [tel, setTel] = useRecoilState(information);
  const [temp, setTemp] = useState();

  const onChangeTel = (e: any) => {
    setTemp(e.target.value);
  };

  const onValid = () => {
    setTel({ tel: temp });
  };
  const onInvalid = () => {
    return errors?.tel?.message;
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
            placeholderText="010-1234-5678"
            registerObject={register('tel', {
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
            <WhitePill
              text={'다음'}
              onClickNavigator={() => {
                if (tel.tel) {
                  setStat({ status: 2 });
                }
              }}
            />
          </div>
        </form>
      </div>
    </S.Wrapper>
  );
}

export default RegisterStart;
