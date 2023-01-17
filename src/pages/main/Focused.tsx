import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as S from './Focused.styled';
import hasukLogo from '../../assets/iconhouse.png';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { mainHouseAtom } from '../../store/atoms';

declare global {
  interface Window {
    kakao: any;
  }
}

function makeMarker(lat: number, long: number) {
  return new window.kakao.maps.Marker({
    position: new window.kakao.maps.LatLng(lat, long),
  });
}

//지역별로 마커 배열 만드는 함수
function makeMarkersList(mkArray: any) {
  const markers = mkArray.map((coordinate: any) => {
    return makeMarker(
      coordinate.house_location.latitude,
      coordinate.house_location.longitude,
    );
  });

  return markers;
}

//지역별로 만든 마커배열 합쳐서 하나의 배열로 만드는 함수 (반복문 구현하기 위해 배열로 만듦)
function makeCompleteList(mkArray: any) {
  const completeMarkers = mkArray.map((markers: any) => {
    return makeMarkersList(markers.houses);
  });

  return completeMarkers;
}

// 클러스터에 들어갈 텍스트 만드는 함수
function makeTextList(mkArray: any) {
  const textList = mkArray.map((texts: any) => {
    return texts.name;
  });
  return textList;
}

function Focusedmap() {
  const { focused } = useParams<string>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [mainHouse, setmainHouse] = useRecoilState(mainHouseAtom);
  const GET_HOUSE = gql`
    query {
      fetchAllHouses {
        name
        houses {
          house_location {
            latitude
            longitude
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_HOUSE, {
    onCompleted: (data) => {
      setmainHouse((current) => data.fetchAllHouses);
    },
  });

  useEffect(() => {
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(state.Latitude, state.Longitude),
      level: 6,
    };
    const map = new window.kakao.maps.Map(container, options);
    function makeCluster(object: any, text: any, marker: any) {
      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: object,
        gridSize: 500,
        averageCenter: true,
        minClusterSize: 1,
        minLevel: 5,
        disableClickZoom: true,
        texts: text,
      });
      clusterer.addMarkers(marker);
      window.kakao.maps.event.addListener(
        clusterer,
        'clusterclick',
        (cluster: any) => {
          const coord = cluster.getCenter();
          const moveLatLng = new window.kakao.maps.LatLng(coord.Ma, coord.La);

          map.setCenter(moveLatLng);

          navigate(`/main/${cluster._model.texts}`, {
            state: { Latitude: coord.Ma, Longitude: coord.La },
          });
        },
      );
    }
    if (mainHouse[0]) {
      const markers = makeCompleteList(mainHouse);
      const texts = makeTextList(mainHouse);
      for (var i in markers) {
        makeCluster(map, texts[i], markers[i]);
      }
    }
  }, [mainHouse]);

  return (
    <S.Container>
      <S.Header>
        <img src={hasukLogo} alt="하숙" />
        <span>고려대-</span>
        <span>{`${focused}`}</span>
      </S.Header>
      <S.Wrapper>
        <div id="map" style={{ width: '100vw', height: '95vh' }}>
          <button>보러 가기</button>
        </div>
      </S.Wrapper>
    </S.Container>
  );
}

export default Focusedmap;
