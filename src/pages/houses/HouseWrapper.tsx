import styled from 'styled-components';
import ImgCarousel from '../../components/molecules/ImgCarousel';
import HouseInfos from './HouseInfos';

const Wrapper = styled.div``;

function HouseWrapper() {
  return (
    <Wrapper>
      <ImgCarousel></ImgCarousel>
      <HouseInfos />
    </Wrapper>
  );
}

export default HouseWrapper;
