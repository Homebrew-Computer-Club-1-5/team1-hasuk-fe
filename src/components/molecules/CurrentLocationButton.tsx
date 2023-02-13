import * as S from './CurrentLocationButton.styled';
import { ReactComponent as CurrentLocation } from '../../assets/CurrentLocation.svg';
import { useRecoilState } from 'recoil';
import { isCurrentLocationButtonClickedAtom } from '../../store/atoms';
import { Ilocation, useLiveLocation } from '../../lib/util/kakaoMap';
import { useEffect, useRef, useState } from 'react';

interface ICurrentLocationButton {
  isCurrentLocationButtonClickedState: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ];
}

function CurrentLocationButton({
  isCurrentLocationButtonClickedState,
}: ICurrentLocationButton) {
  const [isCurrentLocationButtonClicked, setIsCurrentLocationButtonClicked] =
    isCurrentLocationButtonClickedState;
  const { getLocationLively, stopGetLocationLively } = useLiveLocation();
  const [watchId, setWatchId] = useState<number>();
  const watchIdRef = useRef();

  useEffect(() => {
    return () => {
      stopGetLocationLively({ watchId: watchIdRef.current as any });
    };
  }, []);

  useEffect(() => {
    // 2. 동의 됬을시 현재 좌표 정보 업데이트
    if (isCurrentLocationButtonClicked) {
      const watchId = getLocationLively();
      setWatchId((current) => watchId as any);
      watchIdRef.current = watchId as any;
    } else {
      stopGetLocationLively({ watchId: watchId as any });
      watchIdRef.current = watchId as any;
    }
  }, [isCurrentLocationButtonClicked]);

  return (
    <S.Container
      onClick={() => {
        setIsCurrentLocationButtonClicked((current) => !current);
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
