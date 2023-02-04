import styled from 'styled-components';
import P_Manrope_Bold from '../../components/atoms/P_Manrope_Bold';
import P_Manrope_Light from '../../components/atoms/P_Manrope_Light';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fetchCrawledHousesAtom, houseDatasAtom } from '../../store/atoms';

const Wrapper = styled.div`
  display: absolute;
  left: 0;
`;

interface IHouseInfos_ExtraInfos {
  houseWrapperIndex: number;
}

function HouseInfos_ExtraInfos({ houseWrapperIndex }: IHouseInfos_ExtraInfos) {
  const [fetchCrawledHousesData, setFetchCrawledHousesData] = useRecoilState(
    fetchCrawledHousesAtom,
  );
  return (
    <Wrapper>
      <P_Manrope_Bold
        style={{ position: 'relative', left: '15px', bottom: '5px' }}
      >
        연락처, 집 관련 세부 내용만 제공되는 게시물 입니다.
      </P_Manrope_Bold>
    </Wrapper>
  );
}

export default HouseInfos_ExtraInfos;
