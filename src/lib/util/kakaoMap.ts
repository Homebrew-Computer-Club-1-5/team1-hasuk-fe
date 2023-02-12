import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  currentLocationAtom,
  isCurrentLocationButtonClickedAtom,
} from '../../store/atoms';
import CurrentLocationPin from '../../assets/CurrentLocationPin.png';

interface IdisplayMarker {
  locPosition: any;
  markerImage: any;
  map: any;
}

interface IdeleteMarker {
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
        setCurrentLocation((current) => {
          return { longitude, latitude };
        });
      },
      (error) => {
        setIsCurrentLocationButtonClicked((current) => !current);
        alert(
          '위치 정보에 동의하지 않으셨습니다. 이용 하려면 브라우저 설정을 바꾸고 새로고침 주세요.',
        );
      },
      { enableHighAccuracy: true },
    );
    return watchId;
  }
  function stopGetLocationLively({ watchId }: IstopGetLocationLively) {
    navigator.geolocation.clearWatch(watchId as any);
  }

  return { getLocationLively, stopGetLocationLively };
}

export function displayMarker({
  locPosition,
  markerImage,
  map,
}: IdisplayMarker) {
  // 마커를 생성
  var marker = new window.kakao.maps.Marker({
    position: locPosition,
    image: markerImage,
  });

  // marker.setMap(null);
  marker.setMap(map);

  // 지도 중심좌표를 접속위치로 변경합니다

  map.setCenter(locPosition);
  return marker;
}

export function deleteMarker({ map, marker }: IdeleteMarker) {
  marker.setMap(null);
}

export function makeLiveLocationMarkerImage() {
  const liveLocationMarkerImage = new window.kakao.maps.MarkerImage(
    CurrentLocationPin,
    new window.kakao.maps.Size(20, 20),
    {},
  );
  return liveLocationMarkerImage;
}
