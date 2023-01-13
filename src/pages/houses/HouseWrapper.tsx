import styled from 'styled-components';
import ImgCarousel from '../../components/molecules/ImgCarousel';
import HouseInfos from './HouseInfos';

const Wrapper = styled.div`
  margin: 10px 0px;
`;
interface IHouseWrapper {
  houseWrapperIndex: number;
}

function HouseWrapper({ houseWrapperIndex }: IHouseWrapper) {
  return (
    <Wrapper>
      <ImgCarousel houseWrapperIndex={houseWrapperIndex}></ImgCarousel>
      <HouseInfos houseWrapperIndex={houseWrapperIndex} />
    </Wrapper>
  );
}

export default HouseWrapper;
