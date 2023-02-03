import styled from 'styled-components';
import ImgCarousel from '../../components/molecules/ImgCarousel';
import HouseInfos from './HouseInfos';
import { fetchCrawledHousesAtom, houseDatasAtom } from '../../store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

const Wrapper = styled.div`
  margin: 10px 0px;
  /* position: relative; */
  z-index: -1;
`;
interface IHouseWrapper {
  houseWrapperIndex: number;
  onClick: () => void;
}

function HouseWrapper({ houseWrapperIndex, onClick }: IHouseWrapper) {
  const [fetchCrawledHousesData, setFetchCrawledHousesData] = useRecoilState(
    fetchCrawledHousesAtom,
  );
  const img_urls = fetchCrawledHousesData[houseWrapperIndex].img_urls;

  console.log(img_urls);
  return (
    <Wrapper onClick={onClick}>
      <ImgCarousel img_url={img_urls ? img_urls : []}></ImgCarousel>
      <HouseInfos houseWrapperIndex={houseWrapperIndex} />
    </Wrapper>
  );
}

export default HouseWrapper;
