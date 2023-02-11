import InputTemplate from '../../components/molecules/InputTemplate';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import WhitePill from '../../components/molecules/WhitePill';
import * as S from './Tel.styled';
import { useRecoilState } from 'recoil';
import { statusAtom, contactNumberAtom } from '../../store/atoms';
import { useForm, useFormState } from 'react-hook-form';
import { useState, useEffect } from 'react';

const NoticeTextWrapperStyle = {
  textAlign: 'center',
  paddingTop: '0px',
  marginTop: '0px',
  marginBottom: '20px',
};

function RegisterStart() {
  const [stat, setStat] = useRecoilState(statusAtom);
  const [tel, setTel] = useRecoilState(contactNumberAtom);
  const [temp, setTemp] = useState();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onSubmit', defaultValues: { tel: tel } });

  useEffect(() => {
    setTel(temp ? temp : tel);
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
    <S.Container>
      <S.NumberH1>{stat.status}/5</S.NumberH1>
      <NoticeTextWrapper style={NoticeTextWrapperStyle as any}>
        연락 받으실 연락처를 <br />
        입력해 주세요.
      </NoticeTextWrapper>
      <S.Form onSubmit={handleSubmit(onValid, onInvalid)}>
        <InputTemplate
          width="80%"
          placeholderText="01012345678"
          registerObject={register('tel', {
            required: '전화번호가 필요합니다',
            pattern: {
              value: /^([0-9]?|)\d{9,10}$/,
              message: '- 표시 제외하고 입력해 주세요.',
            },
            onChange: onChangeTel,
          })}
        />
        {onInvalid() ? <S.ErrorSpan>{onInvalid()}</S.ErrorSpan> : null}

        <WhitePill
          style={{ marginTop: '20px' }}
          text={'다음'}
          onClick={() => {}}
        />
      </S.Form>
    </S.Container>
  );
}

export default RegisterStart;
