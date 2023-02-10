import * as S from './CurrentLocationButton.styled';
import { ReactComponent as CurrentLocation } from '../../assets/CurrentLocation.svg';

function CurrentLocationButton() {
  return (
    <S.Container>
      <CurrentLocation
        style={{
          position: 'relative',
          width: '20px',
          left: '10px',
          top: '10px',
        }}
      />
    </S.Container>
  );
}

export default CurrentLocationButton;
