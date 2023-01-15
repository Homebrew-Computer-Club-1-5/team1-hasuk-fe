import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


let houseInfo = [
  {
    id: 1,
    name: '안암역',
    houses: [
      {
        id: 1,
        house_location: { latitude: 37.5893528, longitude: 127.0301811 },
      },
      {
        id: 2,
        house_location: { latitude: 37.5825304, longitude: 127.0283483 },
      },
      {
        id: 3,
        house_location: { latitude: 37.5896189, longitude: 127.0298934 },
      },
      {
        id: 4,
        house_location: { latitude: 37.5901673, longitude: 127.0285366 },
      },
      {
        id: 5,
        house_location: { latitude: 37.585138, longitude: 127.0292303 },
      },
      {
        id: 6,
        house_location: { latitude: 37.5883267, longitude: 127.0302012 },
      },
      {
        id: 7,
        house_location: { latitude: 37.5887345, longitude: 127.0298324 },
      },
    ],
  },
  {
    id: 2,
    name: '제기동',
    houses: [
      {
        id: 8,
        house_location: { latitude: 37.5829895, longitude: 127.0312577 },
      },
      {
        id: 9,
        house_location: { latitude: 37.584941, longitude: 127.0323375 },
      },
      {
        id: 10,
        house_location: { latitude: 37.5845658, longitude: 127.0327273 },
      },
      {
        id: 11,
        house_location: { latitude: 37.5848139, longitude: 127.0351969 },
      },
      {
        id: 12,
        house_location: { latitude: 37.585383, longitude: 127.0332783 },
      },
      {
        id: 13,
        house_location: { latitude: 37.586002, longitude: 127.0328378 },
      },
      {
        id: 14,
        house_location: { latitude: 37.5850082, longitude: 127.0341573 },
      },
      {
        id: 15,
        house_location: { latitude: 37.5838392, longitude: 127.031631 },
      },
      {
        id: 16,
        house_location: { latitude: 37.5859686, longitude: 127.0308422 },
      },
    ],
  },
  {
    id: 3,
    name: '고려대역',
    houses: [
      {
        id: 17,
        house_location: { latitude: 37.5882305, longitude: 127.0362851 },
      },
    ],
  },
  {
    id: 4,
    name: '종암동',
    houses: [
      {
        id: 18,
        house_location: { latitude: 37.5923072, longitude: 127.0340199 },
      },
      {
        id: 19,
        house_location: { latitude: 37.5927213, longitude: 127.0338639 },
      },
    ],
  },
];

declare global {
  interface Window {
    kakao: any;
  }
}
// 마커 1개 만드는 함수
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

const Map = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(37.586383, 127.029233),
      level: 6,
    };
    const map = new window.kakao.maps.Map(container, options);
    // 클러스터 만드는 함수
    function makeCluster(object: any, text: any, marker: any) {
      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: object,
        gridSize: 200,
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
          console.log(moveLatLng);
          map.setCenter(moveLatLng);
          console.log(cluster);
          navigate(`/main/${cluster._model.texts}`, {
            state: { Latitude: coord.Ma, Longitude: coord.La },
          });
        },
      );
    }

    const markers = makeCompleteList(houseInfo);
    const texts = makeTextList(houseInfo);
    for (var i in markers) {
      makeCluster(map, texts[i], markers[i]);
    }
  }, []);

  return <div id="map" style={{ width: '100vw', height: '95vh' }} />;
};

export default Map;
