import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './Focused.styled';
import hasukLogo from '../../assets/iconhouse.png';

const Dummy2 = [
  { id: 2 },
  { lat: 37.584969, long: 127.032347 },
  { lat: 37.582546, long: 127.028359 },
];
//더미데이터 부분은 API에서 재호출할거임.

const markers2 = Dummy2.map((coordinate) => {
  return new window.kakao.maps.Marker({
    position: new window.kakao.maps.LatLng(coordinate.lat, coordinate.long),
  });
});

declare global {
  interface Window {
    kakao: any;
  }
}

function Focusedmap() {
  const { focused } = useParams<string>();
  const { state } = useLocation();

  useEffect(() => {
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(state.Latitude, state.Longitude),
      level: 6,
    };
    const map = new window.kakao.maps.Map(container, options);

    const clusterer2 = new window.kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 6,
      disableClickZoom: true,
      texts: '벽산아파트',
    });

    clusterer2.addMarkers(markers2);
  }, []);
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
