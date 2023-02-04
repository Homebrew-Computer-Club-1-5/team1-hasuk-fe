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
  const img_url = houseDatas[houseWrapperIndex].img_urls;
  return (
    <Wrapper onClick={onClick}>
      <ImgCarousel img_url={img_url ? img_url : []}></ImgCarousel>
      <HouseInfos houseWrapperIndex={houseWrapperIndex} />
    </Wrapper>
  );
}

export default HouseWrapper;
