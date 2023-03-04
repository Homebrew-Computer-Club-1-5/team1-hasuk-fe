import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import {
  currentLocationAtom,
  isCurrentLocationButtonClickedAtom,
  mainHousesAtom,
} from '../../store/atoms';
import btnDesign from '../../assets/Btndesign.png';
// import Marker from '../../assets/Marker.svg';
import hasukIconPng from '../../assets/hasukMarker.png';
import gosiwonIconPng from '../../assets/gosiwonMarker.png';
import oneRoomIconPng from '../../assets/oneRoomMarker.png';
import clickedRoomMarkerSvg from '../../assets/clickedRoomMarker.svg';
import etcIconPng from '../../assets/etcMarker.png';
import * as S from './Map.styled';
import Loading from '../../components/molecules/Loading';
import { FETCH_ALL_HOUSES_GROUPED_BY_REGION } from '../../lib/gql';
import {
  deleteMarker,
  displayMarker,
  makeLiveLocationMarkerImage,
} from '../../lib/util/kakaoMap';
import CurrentLocationButton from '../../components/molecules/CurrentLocationButton';
import WhitePill from '../../components/molecules/WhitePill';
import { isEmptyObject } from '../../lib/util/javascript';
import BriefHouse from './BriefHouse';

interface ICoordinate {
  exlatitude?: number;
  exlongitude?: number;
  children?: React.ReactNode;
}
declare global {
  interface Window {
    kakao: any;
  }
}

function Map({ exlatitude, exlongitude, children }: ICoordinate) {
  //state
  useRecoilState(isCurrentLocationButtonClickedAtom);
  const [regionId, setRegionId] = useState();
  const [clusterClicked, setClusterClicked] = useState(false);
  const [kakaoMap, setKakaoMap] = useState();
  const [mapLevel, setMapLevel] = useState<number>();
  const [marker, setMarker] = useState({});
  const [selectedHouseId, setSelectedHouseId] = useState<number>(0);
  const [counter, setCounter] = useState(0);
  const [currentLocation, setCurrentLocation] =
    useRecoilState(currentLocationAtom);
  const [mainHouses, setmainHouses] = useRecoilState(mainHousesAtom);
  const isCurrentLocationButtonClickedState = useState(false);
  const [isCurrentLocationButtonClicked, setIsCurrentLocationButtonClicked] =
    isCurrentLocationButtonClickedState;

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(
    FETCH_ALL_HOUSES_GROUPED_BY_REGION,
    {
      fetchPolicy: 'no-cache',
      onCompleted: (data) => {
        setmainHouses((current) => data.fetchAllHousesGroupedByRegion);
      },
    },
  );

  function navigateToHouses() {
    navigate(`/houses/${regionId}`);
  }

  function markerClickListener(
    marker: any,
    houseId: any,
    latitude: any,
    longitude: any,
    kakaoMap: any,
  ) {
    setSelectedHouseId(0);
    setSelectedHouseId(houseId);
    const moveLatLng = new window.kakao.maps.LatLng(latitude, longitude);
    kakaoMap.setCenter(moveLatLng);
    setCounter((current) => current + 1);
  }

  useEffect(() => {
    // qs에 at있는지 체크하고, 로컬스토리지에 저장
    if (searchParams.get('accessToken')) {
      localStorage.setItem(
        'accessToken',
        searchParams.get('accessToken') as string,
      );
      setSearchParams((currentParams) => {
        const newParams = new URLSearchParams(currentParams);
        newParams.delete('accessToken');
        return newParams.toString();
      });
    }

    // 지도 기본틀 그려주기
    const result = drawKakaoMap();
    setKakaoMap(result);

    // 위치버튼 클릭 안된상태로 초기화
    setIsCurrentLocationButtonClicked((current) => false);
  }, []);

  // houseData 로딩 다되면, 클러스터들 그려주기
  useEffect(() => {
    if (kakaoMap) {
      const regionMarkerList = mainHouses.map((mainHouse) => {
        const markerList = mainHouse.houses.map((house) => {
          return makeMarker(
            house.house_location.latitude,
            house.house_location.longitude,
            house.id,
            house.house_category.id,
            kakaoMap,
          );
        });
        makeCluster(kakaoMap, [mainHouse.name], markerList, mainHouse.id);
      });
    }
  }, [mainHouses, kakaoMap]);

  useEffect(() => {
    if (kakaoMap) {
      const regionMarkerList = mainHouses.map((mainHouse) => {
        const markerList = mainHouse.houses.map((house) => {
          return makeMarker(
            house.house_location.latitude,
            house.house_location.longitude,
            house.id,
            house.house_category.id,
            kakaoMap,
            selectedHouseId,
          );
        });
        makeCluster(kakaoMap, [mainHouse.name], markerList, mainHouse.id);
      });
    }
  }, [selectedHouseId]);

  // 실시간으로 마커 그리기
  useEffect(() => {
    if (
      isCurrentLocationButtonClicked &&
      currentLocation.longitude &&
      currentLocation.latitude
    ) {
      // 이전 마커 삭제
      if (!isEmptyObject(marker)) {
        deleteMarker({ map: kakaoMap, marker });
      }
      // 최신 마커 그리기
      const locPosition = new window.kakao.maps.LatLng(
        currentLocation.latitude,
        currentLocation.longitude,
      );
      const resultMarker = displayMarker({
        locPosition,
        markerImage: makeLiveLocationMarkerImage(),
        map: kakaoMap,
      });
      setMarker((current) => resultMarker);
    }
  }, [currentLocation]);

  // 마커 제거
  useEffect(() => {
    if (
      !isCurrentLocationButtonClicked &&
      currentLocation.longitude &&
      currentLocation.latitude &&
      !isEmptyObject(marker)
    ) {
      const locPosition = new window.kakao.maps.LatLng(
        currentLocation.latitude,
        currentLocation.longitude,
      );
      deleteMarker({ map: kakaoMap, marker });
    }
  }, [isCurrentLocationButtonClicked]);

  function drawKakaoMap() {
    let container = document.getElementById('map');
    let options = {
      center:
        exlatitude && exlongitude
          ? new window.kakao.maps.LatLng(exlatitude, exlongitude)
          : new window.kakao.maps.LatLng(37.586383, 127.029233),
      level: 6,
    };
    const map = new window.kakao.maps.Map(container, options);

    window.kakao.maps.event.addListener(map, 'zoom_changed', function () {
      setMapLevel(map.getLevel());
    });
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
        setRegionId(id);
        setClusterClicked(true);

        //navigate(`/main/${id}`, {
        //  state: { Latitude: coord.Ma, Longitude: coord.La, name: areaName },
        //});
      },
    );
  }

  function makeMarker(
    latitude: number,
    longitude: number,
    houseId: number,
    sortId: number,
    kakaoMap: any,
    selectedHouseId?: number,
  ) {
    const hasukIconImage = new window.kakao.maps.MarkerImage(
      hasukIconPng,
      new window.kakao.maps.Size(40, 40),
      {},
    );
    const oneRoomIconImage = new window.kakao.maps.MarkerImage(
      oneRoomIconPng,
      new window.kakao.maps.Size(40, 40),
      {},
    );
    const gosiwonIconImage = new window.kakao.maps.MarkerImage(
      gosiwonIconPng,
      new window.kakao.maps.Size(40, 40),
      {},
    );
    const etcIconImage = new window.kakao.maps.MarkerImage(
      etcIconPng,
      new window.kakao.maps.Size(40, 40),
      {},
    );
    const clickedIconImage = new window.kakao.maps.MarkerImage(
      clickedRoomMarkerSvg,
      new window.kakao.maps.Size(40, 40),
    );
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(latitude, longitude),
      clickable: true,
    });
    window.kakao.maps.event.addListener(marker, 'click', () => {
      markerClickListener(marker, houseId, latitude, longitude, kakaoMap);
    });
    if (selectedHouseId === houseId) {
      marker.setImage(clickedIconImage);
      console.log('성공');
    } else {
      if (sortId === 2) {
        marker.setImage(hasukIconImage);
      } else if (sortId === 3) {
        marker.setImage(oneRoomIconImage);
      } else if (sortId === 4) {
        marker.setImage(gosiwonIconImage);
      } else {
        marker.setImage(etcIconImage);
      }
    }

    return marker;
  }

  return (
    <S.mapWrapper>
      <CurrentLocationButton
        isCurrentLocationButtonClickedState={
          isCurrentLocationButtonClickedState
        }
      />
      {loading ? <Loading loadingText="메인 페이지 로딩중.." /> : null}
      {mapLevel && mapLevel < 5 ? (
        <S.Legend>
          <div>
            <img src={hasukIconPng} />
            <p>하숙</p>
          </div>
          <div>
            <img src={oneRoomIconPng} />
            <p>원룸/자취방</p>
          </div>
          <div>
            <img src={gosiwonIconPng} />
            <p>고시원</p>
          </div>
          <div>
            <img src={etcIconPng} />
            <p>기타</p>
          </div>
        </S.Legend>
      ) : null}
      <div id="map" style={{ width: '100%', height: '95vh' }}>
        {clusterClicked ? (
          <WhitePill
            style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translate(-50%,0%)',
            }}
            onClick={() => navigateToHouses()}
            text={'보러 가기'}
          />
        ) : null}

        <BriefHouse
          counter={counter}
          house_id={selectedHouseId ? selectedHouseId : 0}
        />
      </div>
    </S.mapWrapper>
  );
}

export default Map;
