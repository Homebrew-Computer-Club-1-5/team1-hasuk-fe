import styled from 'styled-components';
import ImgCarousel from '../../components/molecules/ImgCarousel';
import HouseInfos from './HouseInfos';
import { houseDatasAtom } from '../../store/atoms';
import { useRecoilValue } from 'recoil';

const Wrapper = styled.div`
  margin: 10px 0px;
`;
interface IHouseWrapper {
  houseWrapperIndex: number;
}

function HouseWrapper({ houseWrapperIndex }: IHouseWrapper) {
  const houseDatas = useRecoilValue(houseDatasAtom);
  const img_url = houseDatas[houseWrapperIndex].img_url;

  return (
    <Wrapper>
      <ImgCarousel img_url={img_url}></ImgCarousel>
      <HouseInfos houseWrapperIndex={houseWrapperIndex} />
    </Wrapper>
  );
}

export default HouseWrapper;
