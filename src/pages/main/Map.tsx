import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { mainHousesAtom } from '../../store/atoms';
import btnDesign from '../../assets/Btndesign.png';

declare global {
  interface Window {
    kakao: any;
  }
}
const Map = () => {
  const navigate = useNavigate();
  const [mainHouses, setmainHouses] = useRecoilState(mainHousesAtom);
  const GET_HOUSE = gql`
    query {
      fetchAllHouses {
        name
        id
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

  function makeMarker(lat: number, long: number) {
    return new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(lat, long),
    });
  }

  useEffect(() => {
    const kakaoMap = drawKakaoMap();

    const regionMarkerList = mainHouses.map((mainHouse) => {
      const markerList = mainHouse.houses.map((house) => {
        return makeMarker(
          house.house_location.latitude,
          house.house_location.longitude,
        );
      });
      console.log(markerList);
      makeCluster(kakaoMap, [mainHouse.name], markerList, mainHouse.id);
    });
  }, [mainHouses]);


  return <div id="map" style={{ width: '100vw', height: '95vh' }} />;
};

export default Map;
