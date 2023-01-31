import P_Manrope_Regular from '../atoms/P_Manrope_Regular';
import * as S from './SideBar.styled';
import { ReactComponent as PowerButton } from '../../assets/PowerButton.svg';
import { ReactComponent as ForthButton } from '../../assets/ForthButton.svg';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
interface ISideBar {
  isSideBarOpened: boolean;
  setIsSideBarOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function SideBar({ isSideBarOpened, setIsSideBarOpened }: ISideBar) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  return (
    <S.Container isSideBarOpened={isSideBarOpened}>
      <S.AuthWrapper
        onClick={() => {
          if (accessToken) {
            localStorage.removeItem('accessToken');
            alert('로그아웃 완료');
            navigate('/main');
          } else {
            navigate('/auth/login');
          }
        }}
      >
        <PowerButton />
        <P_Manrope_Regular>
          {accessToken ? '로그아웃 하기' : '로그인 하기'}
        </P_Manrope_Regular>
      </S.AuthWrapper>
      <S.GrayLine />
      <P_Manrope_Regular
        onClick={() => {
          if (accessToken) navigate('/myhouse');
          else {
            alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
            navigate('/auth/login');
          }
        }}
      >
        내 방 관리
      </P_Manrope_Regular>
      <S.SideBarCloseButton
        onClick={() => {
          setIsSideBarOpened((current) => !current);
        }}
      >
        <ForthButton fill="#494949" />
      </S.SideBarCloseButton>
    </S.Container>
  );
}

export default SideBar;
