import styled from 'styled-components';
import { ReactComponent as BackButton } from '../../assets/BackButton.svg';
import { ReactComponent as UnivRoomIcon } from '../../assets/UnivRoomIcon.svg';
import P_Manrope_ExtraBold from '../atoms/P_Manrope_ExtraBold';

const Wrapper = styled.div`
  width: 100%;
  height: 30px;
  padding: 20px 0;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;
interface ITitleWrapper2 {
  onClickBackButton: () => void;
}

function TitleWrapper2({ onClickBackButton }: ITitleWrapper2) {
  return (
    <Wrapper>
      <BackButton
        onClick={onClickBackButton}
        style={{
          width: '36px', //
          position: 'absolute',
          left: 15,
        }}
        fill="black"
      />
      <UnivRoomIcon />
      <P_Manrope_ExtraBold style={{ fontSize: '30px' }}>
        대학방
      </P_Manrope_ExtraBold>
    </Wrapper>
  );
}

export default TitleWrapper2;
