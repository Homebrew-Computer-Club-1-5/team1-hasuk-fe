import styled from 'styled-components';
import P_Manrope_ExtraBold from '../../components/atoms/P_Manrope_ExtraBold';
import P_Manrope_Regular from '../../components/atoms/P_Manrope_Regular';
import { useRecoilValue } from 'recoil';
import { houseDatasAtom } from '../../store/atoms';

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  top: 15%; // 수정 필요. 야매로 중간에 배치시킴
  align-items: baseline;
`;
interface IHouseInfos_PriceInfo {
  houseWrapperIndex: number;
}

function HouseInfos_PriceInfo({ houseWrapperIndex }: IHouseInfos_PriceInfo) {
  const houseDatas = useRecoilValue(houseDatasAtom);
  return (
    <Wrapper>
      <P_Manrope_ExtraBold style={{ fontSize: '35px' }}>
        {houseDatas[houseWrapperIndex].month_cost}
      </P_Manrope_ExtraBold>
      <P_Manrope_Regular>만 /월</P_Manrope_Regular>
    </Wrapper>
  );
}

export default HouseInfos_PriceInfo;
