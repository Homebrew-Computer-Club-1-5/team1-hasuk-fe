import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  currentLocationAtom,
  isCurrentLocationButtonClickedAtom,
} from '../../store/atoms';

interface IdisplayMarker {
  locPosition: any;
  map: any;
}

interface IdeleteMarker {
  locPosition: any;
  map: any;
  marker: any;
}

export interface Ilocation {
  longitude: number;
  latitude: number;
}

interface IstopGetLocationLively {
  watchId: number;
}
interface IuseLiveLocation {
  getLocationLively: () => number;
  stopGetLocationLively: ({ watchId }: IstopGetLocationLively) => void;
}

export function useLiveLocation(): IuseLiveLocation {
  const [currentLocation, setCurrentLocation] =
    useRecoilState(currentLocationAtom);
  const [isCurrentLocationButtonClicked, setIsCurrentLocationButtonClicked] =
    useRecoilState(isCurrentLocationButtonClickedAtom);
  function getLocationLively() {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        setCurrentLocation((current) => {
          return { longitude, latitude };
        });
      },
      (error) => {
        setIsCurrentLocationButtonClicked((current) => !current);
        alert(
          '위치 정보에 동의하지 않으셨습니다. 이용 하려면 브라우저 설정을 바꿔 주세요.',
        );
      },
      { enableHighAccuracy: true },
    );
    console.log(watchId);
    return watchId;
  }
  function stopGetLocationLively({ watchId }: IstopGetLocationLively) {
    console.log('실시간으로 위치정보 불러오기를 중단합니다.', watchId);
    navigator.geolocation.clearWatch(watchId as any);
  }

  return { getLocationLively, stopGetLocationLively };
}

export function displayMarker({ locPosition, map }: IdisplayMarker) {
  // 마커를 생성
  var marker = new window.kakao.maps.Marker({
    position: locPosition,
  });

  // marker.setMap(null);
  marker.setMap(map);

  // 지도 중심좌표를 접속위치로 변경합니다

  map.setCenter(locPosition);
  return marker;
}

export function deleteMarker({ locPosition, map, marker }: IdeleteMarker) {
  marker.setMap(null);
}
