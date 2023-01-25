import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import InputTemplate from '../../../components/molecules/InputTemplate';
import NoticeTextWrapper from '../../../components/molecules/NoticeTextWrapper';
import TitleWrapper2 from '../../../components/molecules/TitleWrapper2';
import { Login_datasAtom } from '../../../store/atoms';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 50px;
`;

function Login() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const setLogin_Datas = useSetRecoilState(Login_datasAtom);

  const onValid = () => {
    console.log('valid');
    // setLogin_Datas((current) => '데이터'); /////////////////////
  };
  return (
    <Wrapper>
      <TitleWrapper2
        onClickBackButton={() => {
          console.log('백버튼 클릭');
        }}
      />

      <NoticeTextWrapper>
        방을 추가하려면
        <br />
        로그인/회원가입 하셔야 합니다.
      </NoticeTextWrapper>

      <form onSubmit={handleSubmit(onValid)}>
        <InputTemplate
          registerObject={register('contact_number', {
            required: true,
            pattern: /^\d{2,3}-\d{3,4}-\d{4}$/,
          })}
          placeholderText={'인풋 placeholder 메세지'}
        ></InputTemplate>
        <button>제출 버튼</button>
      </form>
    </Wrapper>
  );
}

export default Login;
