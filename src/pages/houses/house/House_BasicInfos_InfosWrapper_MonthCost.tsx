import styled from 'styled-components';
import P_Manrope_ExtraBold from '../../../components/atoms/P_Manrope_ExtraBold';
import P_Manrope_Light from '../../../components/atoms/P_Manrope_Light';
import P_Manrope_Regular from '../../../components/atoms/P_Manrope_Regular';

const Wrapper = styled.div`
  width: 65px;
  height: 80px;
`;
const UpperWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: baseline;
`;

function House_BasicInfos_InfosWrapper_MonthCost() {
  return (
    <Wrapper>
      <UpperWrapper>
        <P_Manrope_ExtraBold style={{ fontSize: '35px' }}>
          50
        </P_Manrope_ExtraBold>
        <P_Manrope_Light>/월</P_Manrope_Light>
      </UpperWrapper>

      <P_Manrope_Regular style={{ textAlign: 'center' }}>
        월세
      </P_Manrope_Regular>
    </Wrapper>
  );
}

export default House_BasicInfos_InfosWrapper_MonthCost;
