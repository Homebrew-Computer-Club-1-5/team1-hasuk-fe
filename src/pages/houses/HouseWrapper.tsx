import styled from 'styled-components';
import ImgCarousel from '../../components/molecules/ImgCarousel';
import HouseInfos from './HouseInfos';
import { houseDatasAtom } from '../../store/atoms';
import { useRecoilValue } from 'recoil';

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
  const houseDatas = useRecoilValue(houseDatasAtom);
  const img_urls = houseDatas[houseWrapperIndex].img_urls;

  const img_url = img_urls.map((each) => each.img_url);
  console.log(img_url);
  return (
    <Wrapper onClick={onClick}>
      <ImgCarousel img_url={img_url}></ImgCarousel>
      <HouseInfos houseWrapperIndex={houseWrapperIndex} />
    </Wrapper>
  );
}

export default HouseWrapper;
