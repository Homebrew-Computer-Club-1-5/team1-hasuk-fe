import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import NoticeTextWrapper from '../../../components/molecules/NoticeTextWrapper';
import TitleWrapper2 from '../../../components/molecules/TitleWrapper2';
import { Login_datasAtom } from '../../../store/atoms';
import LoginWithKakaoButton from '../../../assets/LoginWithKakao.png';
import useResetAllAtoms from '../../../lib/util/resetAllAtoms';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 50px;
`;

function Login() {
  // const resetAllAtoms = useResetAllAtoms();
  // resetAllAtoms();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <TitleWrapper2
        onClickBackButton={() => {
          navigate(`/`);
        }}
      />

      <NoticeTextWrapper>로그인/회원가입이 필요합니다.</NoticeTextWrapper>
      <img
        src={LoginWithKakaoButton}
        style={{ position: 'relative', top: '120px' }}
        onClick={() => {
          window.location.href = `${process.env.REACT_APP_SERVER_URL}/api/auth/login/kakao`;
        }}
      />
    </Wrapper>
  );
}

export default Login;
