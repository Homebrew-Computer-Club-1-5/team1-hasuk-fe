import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import P_Manrope_Bold from '../../components/atoms/P_Manrope_Bold';
import { fetchCrawledHousesAtom } from '../../store/atoms';
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
  const [fetchCrawledHousesData, setFetchCrawledHousesData] = useRecoilState(
    fetchCrawledHousesAtom,
  );
  const category = fetchCrawledHousesData[houseWrapperIndex].house_category;
  return (
    <Wrapper>
      <P_Manrope_Bold style={{ fontSize: '30px' }}>
        {category === 1
          ? '일반'
          : category === 2
          ? '하숙'
          : category === 3
          ? '자취방/원룸'
          : category === 4
          ? '고시원'
          : '기타'}
      </P_Manrope_Bold>
      <HouseInfos_ExtraInfos houseWrapperIndex={houseWrapperIndex} />
    </Wrapper>
  );
}
export default HouseInfos;
