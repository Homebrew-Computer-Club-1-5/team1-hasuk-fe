import * as S from './CurrentLocationButton.styled';
import { ReactComponent as CurrentLocation } from '../../assets/CurrentLocation.svg';
import { useRecoilState } from 'recoil';
import { isCurrentLocationButtonClickedAtom } from '../../store/atoms';
import { Ilocation, useLiveLocation } from '../../lib/util/kakaoMap';
import { useEffect } from 'react';

interface ICurrentLocationButton {
  setCurrentLocation: React.Dispatch<React.SetStateAction<Ilocation>>;
}

function CurrentLocationButton({ setCurrentLocation }: ICurrentLocationButton) {
  const [isCurrentLocationButtonClicked, setIsCurrentLocationButtonClicked] =
    useRecoilState(isCurrentLocationButtonClickedAtom);
  const { getLocationLively, stopGetLocationLively, currentLiveLocation } =
    useLiveLocation();

  useEffect(() => {
    setCurrentLocation(currentLiveLocation);
  }, [currentLiveLocation]);

  return (
    <S.Container
      onClick={() => {
        setIsCurrentLocationButtonClicked((current) => {
          if (current === false) {
            getLocationLively();
            // navigator.geolocation.watchPosition((position) => {
            //   console.log('실시간으로 위치정보를 불러옵니다.');
            //   const { latitude, longitude } = position.coords;
            // });
          } else {
            stopGetLocationLively();
          }
          return !current;
        });
      }}
      isCurrentLocationButtonClicked={isCurrentLocationButtonClicked}
    >
      <CurrentLocation
        style={{
          position: 'relative',
          width: '20px',
          left: '10px',
          top: '10px',
          fill: `${!isCurrentLocationButtonClicked ? 'black' : 'white'}`,
        }}
      />
    </S.Container>
  );
}

export default CurrentLocationButton;
