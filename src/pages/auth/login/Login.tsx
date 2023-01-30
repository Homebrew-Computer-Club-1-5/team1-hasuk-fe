import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import NoticeTextWrapper from '../../../components/molecules/NoticeTextWrapper';
import TitleWrapper2 from '../../../components/molecules/TitleWrapper2';
import { Login_datasAtom } from '../../../store/atoms';
import LoginWithKakaoButton from '../../../assets/LoginWithKakao.png';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 50px;
`;

function Login() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <TitleWrapper2
        onClickBackButton={() => {
          navigate(`/main`);
        }}
      />

      <NoticeTextWrapper>
        방을 추가하려면
        <br />
        로그인/회원가입 하셔야 합니다.
      </NoticeTextWrapper>
      <img
        src={LoginWithKakaoButton}
        style={{ position: 'relative', top: '120px' }}
        onClick={() => {
          window.location.href = 'http://localhost:8080/auth/login/kakao';
        }}
      />
      {/* <form onSubmit={handleSubmit(onValid)}>
        <InputTemplate
          registerObject={register('contact_number', {
            required: true,
            pattern: /^\d{2,3}-\d{3,4}-\d{4}$/,
          })}
          placeholderText={'인풋 placeholder 메세지'}
        ></InputTemplate>
        <button>제출 버튼</button>
      </form> */}
    </Wrapper>
  );
}

export default Login;
