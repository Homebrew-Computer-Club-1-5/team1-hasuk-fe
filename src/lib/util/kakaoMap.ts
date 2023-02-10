import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentLiveLocationAtom } from '../../store/atoms';

interface IdisplayMarker {
  locPosition: any;
  map: any;
}

export interface Ilocation {
  longitude: number;
  latitude: number;
}

interface IuseLiveLocation {
  getLocationLively: () => void;
  stopGetLocationLively: () => void;
  currentLiveLocation: Ilocation;
}

export function useLiveLocation(): IuseLiveLocation {
  const [currentLiveLocation, setCurrentLiveLocation] = useState<Ilocation>(
    {} as any,
  );
  let watchId: number | null = null;
  function getLocationLively() {
    if (watchId === null) {
      console.log('실시간으로 위치정보를 불러오기를 시작합니다.');
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          console.log('실시간으로 위치정보 로딩중..');
          const { latitude, longitude } = position.coords;
          setCurrentLiveLocation((current) => {
            return { longitude, latitude };
          });
        },
        (error) => {
          console.log(error.message);
          alert(
            '위치 정보에 동의하지 않으셨습니다. 이용 하려면 브라우저 설정을 바꿔 주세요.',
          );
        },
        { enableHighAccuracy: true, timeout: 3000 },
      );
    }
  }
  function stopGetLocationLively() {
    console.log('실시간으로 위치정보 불러오기를 중단합니다.');
    navigator.geolocation.clearWatch(watchId as any);
    setCurrentLiveLocation((current) => ({} as any));
    watchId = null;
  }

  return { getLocationLively, stopGetLocationLively, currentLiveLocation };
}

export function displayMarker({ locPosition, map }: IdisplayMarker) {
  // 마커를 생성합니다
  var marker = new window.kakao.maps.Marker({
    position: locPosition,
  });

  marker.setMap(map);

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}
