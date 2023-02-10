import * as S from './Main.styled';
import Map from './Map';
import hasukLogo from '../../assets/iconhouse.png';
import P_Manrope_ExtraBold from '../../components/atoms/P_Manrope_ExtraBold';
import icon from '../../assets/haksamo.png';
import CreateHouseButton from '../../components/molecules/CreateHouseButton';
import MenuButton from '../../components/molecules/MenuButton';
import SideBar from '../../components/molecules/SideBar';
import { useEffect, useState } from 'react';
import useResetAllAtoms from '../../lib/util/resetAllAtoms';
import ImgWrapper from '../../components/atoms/ImgWrapper';
import Selectbox from '../../components/molecules/Selectbox';
import WhitePill from '../../components/molecules/WhitePill';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/molecules/NavBar';
import CurrentLocationButton from '../../components/molecules/CurrentLocationButton';

declare global {
  interface Window {
    kakao: any;
  }
}

// import icon from '../../assets/haksamo.png';
function Main() {
  const navigate = useNavigate();
  const resetAllAtoms = useResetAllAtoms();
  const onchange = () => {};
  const [isSideBarOpened, setIsSideBarOpened] = useState(false);
  useEffect(() => {
    resetAllAtoms();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <ImgWrapper source={hasukLogo} alternative={'대학방'} />
        <P_Manrope_ExtraBold>대학방</P_Manrope_ExtraBold>
        <S.versionBox>v {process.env.REACT_APP_VERSION}</S.versionBox>
        <Selectbox
          source={icon}
          stuff={[{ text: '고려대', value: 1, defaultValue: false }]}
        />
      </S.Header>
      <S.MapWrapper>
        <Map />
      </S.MapWrapper>
    </S.Container>
  );
}
export default Main;
