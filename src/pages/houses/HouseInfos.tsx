import styled from 'styled-components';
import HouseInfos_PriceInfos from './HouseInfos.PriceInfo';
import HouseInfos_ExtraInfos from './HouseInfos_ExtraInfos';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: baseline;
`;

function HouseInfos() {
  return (
    <Wrapper>
      <HouseInfos_ExtraInfos />
      <HouseInfos_PriceInfos />
    </Wrapper>
  );
}
export default HouseInfos;
