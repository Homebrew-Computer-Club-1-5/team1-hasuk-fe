import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as S from './Focused.styled';
import hasukLogo from '../../assets/iconhouse.png';
import P_Manrope_ExtraBold from '../../components/atoms/P_Manrope_ExtraBold';
import WhitePill from '../../components/molecules/WhitePill';
import CreateHouseButton from '../../components/molecules/CreateHouseButton';
import MenuButton from '../../components/molecules/MenuButton';
import SideBar from '../../components/molecules/SideBar';
import Map from './Map';
import ImgWrapper from '../../components/atoms/ImgWrapper';

declare global {
  interface Window {
    kakao: any;
  }
}

function Focusedmap() {
  const [isSideBarOpened, setIsSideBarOpened] = useState(false);
  const { region_id } = useParams<string>();
  const { state } = useLocation();
  const navigate = useNavigate();
  function navigateToHouses() {
    navigate(`/houses/${region_id}`);
  }

  return (
    <S.Container>
      <S.Header>
        <ImgWrapper source={hasukLogo} alternative={'대학방'} />
        <S.versionBox>v {process.env.REACT_APP_VERSION}</S.versionBox>
        <P_Manrope_ExtraBold>고려대-{`${state.name}`}</P_Manrope_ExtraBold>
      </S.Header>
      <S.MapWrapper>
        <CreateHouseButton />
        <MenuButton
          onClick={() => {
            setIsSideBarOpened((current) => !current);
          }}
        />
        <SideBar
          isSideBarOpened={isSideBarOpened}
          setIsSideBarOpened={setIsSideBarOpened}
        />

        <Map exlatitude={state.Latitude} exlongitude={state.Longitude}>
          <WhitePill
            style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translate(-50%,0%)',
            }}
            onClickNavigator={() => navigateToHouses()}
            text={'보러 가기'}
          />
        </Map>
      </S.MapWrapper>
    </S.Container>
  );
}

export default Focusedmap;
