import styled from 'styled-components';
import HouseInfos_PriceInfos from './HouseInfos.PriceInfo';
import HouseInfos_ExtraInfos from './HouseInfos_ExtraInfos';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: baseline;
`;

interface IHouseInfos {
  houseWrapperIndex: number;
}

function HouseInfos({ houseWrapperIndex }: IHouseInfos) {
  return (
    <Wrapper>
      <HouseInfos_ExtraInfos houseWrapperIndex={houseWrapperIndex} />
    </Wrapper>
  );
}
export default HouseInfos;
