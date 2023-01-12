import styled from 'styled-components';
import P_Manrope_Bold from '../../components/atoms/P_Manrope_Bold';
import P_Manrope_Light from '../../components/atoms/P_Manrope_Light';

const Wrapper = styled.div`
  display: absolute;
  left: 0;
`;

function HouseInfos_ExtraInfos() {
  return (
    <Wrapper>
      <P_Manrope_Bold>공실 있음</P_Manrope_Bold>
      <P_Manrope_Light>남성 전용</P_Manrope_Light>
      <P_Manrope_Light>안암역 5분 거리</P_Manrope_Light>
    </Wrapper>
  );
}

export default HouseInfos_ExtraInfos;
