import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { accessTokenAtom, mainHousesAtom } from '../../store/atoms';
import btnDesign from '../../assets/Btndesign.png';
import Marker from '../../assets/Marker.svg';
import hasukIcon from '../../assets/hasuk.png';
import gosiIcon from '../../assets/gosiwon.png';

declare global {
  interface Window {
    kakao: any;
  }
}
const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);

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
          width: '85px',
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
    if (searchParams.get('accessToken')) {
      setAccessToken((current) => searchParams.get('accessToken') as string);
      setSearchParams((currentParams) => {
        const newParams = new URLSearchParams(currentParams);
        newParams.delete('accessToken');
        return newParams.toString();
      });
    }
  }, [mainHouses]);

  return <div id="map" style={{ width: '100%', height: '95vh' }} />;
};

export default Map;
