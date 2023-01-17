import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { mainHouseAtom } from '../../store/atoms';

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

//지역별로 마커 배열 만드는 함수 mkArray에 houses가 들어가야함
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

  return <div id="map" style={{ width: '100vw', height: '95vh' }} />;
};

export default Map;
