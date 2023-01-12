import styled from 'styled-components';
import P_Manrope_ExtraBold from '../../components/atoms/P_Manrope_ExtraBold';
import P_Manrope_Regular from '../../components/atoms/P_Manrope_Regular';

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  top: 15%; // 수정 필요. 야매로 중간에 배치시킴
  align-items: baseline;
`;

function HouseInfos_PriceInfo() {
  return (
    <Wrapper>
      <P_Manrope_ExtraBold style={{ fontSize: '35px' }}>
        30~50
      </P_Manrope_ExtraBold>
      <P_Manrope_Regular> /월</P_Manrope_Regular>
    </Wrapper>
  );
}

export default HouseInfos_PriceInfo;
