import InputTemplate from '../../components/molecules/InputTemplate';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import WhitePill from '../../components/molecules/WhitePill';
import * as S from './Tel.styled';
import { useRecoilState } from 'recoil';
import { status, contactNumber } from './atoms';
import { useForm, useFormState } from 'react-hook-form';
import { useState, useEffect } from 'react';

const NoticeTextWrapperStyle = {
  paddingTop: '0px',
  marginTop: '0px',
};

function RegisterStart() {
  const [stat, setStat] = useRecoilState(status);
  const [tel, setTel] = useRecoilState(contactNumber);
  const [temp, setTemp] = useState();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({ mode: 'onSubmit', defaultValues: { tel: tel } });

  useEffect(() => {
    if (temp) {
      setTel(temp);
    } else {
      setTel(tel);
    }
  }, [temp]);

  const onChangeTel = (e: any) => {
    setTemp(e.target.value);
  };

  const onValid = () => {
    setStat({ status: 3 });
  };
  const onInvalid = () => {
    return errors?.tel?.message;
  };
  return (
    <S.Wrapper>
      <div id="textPlace">
        <h1>{stat.status}/5</h1>
        <NoticeTextWrapper style={NoticeTextWrapperStyle}>
          연락 받으실 연락처를 <br />
          입력해 주세요.
        </NoticeTextWrapper>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <InputTemplate
            placeholderText="01012345678"
            registerObject={register('tel', {
              required: '전화번호가 필요합니다',
              pattern: {
                value: /^([0-9]?|)\d{9,10}$/,
                message: '- 표시 제외한 정확한 전화번호를 입력해 주세요.',
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
