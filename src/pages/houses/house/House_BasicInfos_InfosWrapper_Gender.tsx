import styled from 'styled-components';
import { ReactComponent as Gender } from '../../../assets/Gender.svg';
import P_Manrope_Regular from '../../../components/atoms/P_Manrope_Regular';

const Wrapper = styled.div`
  text-align: center;
  align-self: flex-end;
`;

function House_BasicInfos_InfosWrapper_Gender() {
  return (
    <Wrapper>
      <Gender style={{ width: '25px', height: '25px' }} />
      <P_Manrope_Regular style={{ textAlign: 'center' }}>
        남성 전용
      </P_Manrope_Regular>
    </Wrapper>
  );
}

export default House_BasicInfos_InfosWrapper_Gender;
