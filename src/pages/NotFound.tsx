import { useNavigate } from 'react-router-dom';
import WhitePill from '../components/molecules/WhitePill';
import * as S from './NotFound.styled';

function NotFound() {
  const navigate = useNavigate();
  return (
    <S.Container>
      <h1>404 Page Not Found</h1>
      <p>페이지를 찾을수 없습니다.</p>
      <p>주소를 바르게 입력해 주세요!</p>
      <WhitePill
        text="메인 페이지로"
        onClick={() => {
          navigate('/');
        }}
        style={{ marginTop: '50px' }}
      ></WhitePill>
    </S.Container>
  );
}

export default NotFound;
