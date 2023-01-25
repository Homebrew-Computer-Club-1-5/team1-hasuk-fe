import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as S from './Focused.styled';
import hasukLogo from '../../assets/iconhouse.png';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { mainHousesAtom } from '../../store/atoms';
import btnDesign from '../../assets/Btndesign.png';
import P_Manrope_ExtraBold from '../../components/atoms/P_Manrope_ExtraBold';
import hasukIcon from '../../assets/hasuk.png';
import gosiIcon from '../../assets/gosiwon.png';
import WhitePill from '../../components/molecules/WhitePill';
declare global {
  interface Window {
    kakao: any;
  }
}

function Focusedmap() {
  const { region_id } = useParams<string>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [mainHouses, setmainHouses] = useRecoilState(mainHousesAtom);
  const GET_HOUSE = gql`
    query {
      fetchAllHouses {
        name
        id
        houses {
          house_location {
            houseId
            sortId
            latitude
            longitude
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_HOUSE, {
    onCompleted: (data) => {
      setmainHouses((current) => data.fetchAllHouses);
    },
  });

  function drawKakaoMap() {
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(37.586383, 127.029233),
      level: 6,
    };
    const map = new window.kakao.maps.Map(container, options);
    return map;
  }
  function navigateToHouses() {
    navigate(`/houses/${region_id}`);
  }

  function makeCluster(kakaoMap: any, text: any, marker: any, id: any) {
    console.log(marker);
    const clusterer = new window.kakao.maps.MarkerClusterer({
      map: kakaoMap,
      gridSize: 500,
      averageCenter: true,
      minClusterSize: 1,
      minLevel: 5,
      disableClickZoom: true,
      texts: text,
      styles: [
        {
          width: '80px',
          height: '30px',
          padding: '8px 0px 0px 0px',

          backgroundImage: `url(${btnDesign})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',

          color: '#000',
          fontSize: '15px',
          textAlign: 'center',

          fontWeight: 'bold',
          lineHeight: '15px',
          filter: 'drop-shadow(3px 3px 3px grey)',
        },
      ],
    });
    clusterer.addMarkers(marker);
    window.kakao.maps.event.addListener(
      clusterer,
      'clusterclick',
      (cluster: any) => {
        const coord = cluster.getCenter();
        const areaName = clusterer.getTexts();
        const moveLatLng = new window.kakao.maps.LatLng(coord.Ma, coord.La);

        kakaoMap.setCenter(moveLatLng);

        navigate(`/main/${id}`, {
          state: { Latitude: coord.Ma, Longitude: coord.La, name: areaName },
        });
      },
    );
  }

  function makeMarker(
    lat: number,
    long: number,
    houseId: number,
    sortId: number,
  ) {
    const hIcon = new window.kakao.maps.MarkerImage(
      hasukIcon,
      new window.kakao.maps.Size(40, 40),
      {
        shape: 'poly',
      },
    );
    const gIcon = new window.kakao.maps.MarkerImage(
      gosiIcon,
      new window.kakao.maps.Size(40, 40),
      {},
    );
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(lat, long),
      clickable: true,
    });
    window.kakao.maps.event.addListener(marker, 'click', function () {
      navigate(`/house/${houseId}`);
    });
    if (sortId === 2) {
      marker.setImage(hIcon);
    } else {
      marker.setImage(gIcon);
    }
    return marker;
  }

  useEffect(() => {
    const kakaoMap = drawKakaoMap();

    const regionMarkerList = mainHouses.map((mainHouse) => {
      const markerList = mainHouse.houses.map((house) => {
        return makeMarker(
          house.house_location.latitude,
          house.house_location.longitude,
          house.house_location.houseId,
          house.house_location.sortId,
        );
      });
      console.log(markerList);
      makeCluster(kakaoMap, [mainHouse.name], markerList, mainHouse.id);
    });
  }, [mainHouses]);

  return (
    <S.Container>
      <S.Header>
        <img src={hasukLogo} alt="하숙" />
        <S.versionBox>v {process.env.REACT_APP_VERSION}</S.versionBox>
        <P_Manrope_ExtraBold>고려대-{`${state.name}`}</P_Manrope_ExtraBold>
      </S.Header>
      <S.Wrapper>
        <div id="map" style={{ width: '100vw', height: '95vh' }}>
          <div id="buttonplace">
            <WhitePill
              onClickNavigator={() => navigateToHouses()}
              text={'보러 가기'}
            />
          </div>
        </div>
      </S.Wrapper>
    </S.Container>
  );
}

export default Focusedmap;
