import { canUseLayoutEffect } from '@apollo/client/utilities';
import styled from 'styled-components';
import { Ihouse_location } from '../../../store/atoms';
import { useEffect } from 'react';
declare global {
  interface Window {
    kakao: any;
  }
}
const Wrapper = styled.div`
  background-color: lightgray;
  width: 85%;
  height: 170px;
  margin: 0 auto;
`;

interface IHouse_LocationInfoWrapper_Map {
  house_location: Ihouse_location;
}

function House_LocationInfoWrapper_Map({
  house_location,
}: IHouse_LocationInfoWrapper_Map) {
  useEffect(() => {
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(
        house_location.latitude,
        house_location.longitude,
      ),
      level: 4,
    };
    const map = new window.kakao.maps.Map(container, options);
    const marker = new window.kakao.maps.Marker({
      position: options.center,
    });
    marker.setMap(map);
  });

  return (
    <Wrapper>
      <div id="map" style={{ width: '85%', height: '170px' }} />
    </Wrapper>
  );
}

export default House_LocationInfoWrapper_Map;
