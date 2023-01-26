import P_Manrope_Regular from '../atoms/P_Manrope_Regular';
import * as S from './SideBar.styled';
import { ReactComponent as PowerButton } from '../../assets/PowerButton.svg';
import { ReactComponent as ForthButton } from '../../assets/ForthButton.svg';

import { useNavigate } from 'react-router-dom';
interface ISideBar {
  isSideBarOpened: boolean;
  setIsSideBarOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function SideBar({ isSideBarOpened, setIsSideBarOpened }: ISideBar) {
  const navigate = useNavigate();
  return (
    <S.Container isSideBarOpened={isSideBarOpened}>
      <S.AuthWrapper
        onClick={() => {
          navigate('/auth/login');
        }}
      >
        <PowerButton />
        <P_Manrope_Regular>로그인 하기</P_Manrope_Regular>
      </S.AuthWrapper>
      <S.GrayLine />
      <P_Manrope_Regular
        onClick={() => {
          navigate('/myhouse');
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
