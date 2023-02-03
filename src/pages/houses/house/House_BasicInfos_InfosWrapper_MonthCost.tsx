import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import P_Manrope_ExtraBold from '../../../components/atoms/P_Manrope_ExtraBold';
import P_Manrope_Light from '../../../components/atoms/P_Manrope_Light';
import P_Manrope_Regular from '../../../components/atoms/P_Manrope_Regular';
import { houseDataAtom } from '../../../store/atoms';

const Wrapper = styled.div`
  width: 65px;
  height: 80px;
`;
const UpperWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: baseline;
`;

function House_BasicInfos_InfosWrapper_MonthCost() {
  const houseData = useRecoilValue(houseDataAtom);
  return (
    <Wrapper>
      <UpperWrapper>
        <P_Manrope_ExtraBold
          style={{ fontSize: `${!houseData.is_crolled ? '35px' : '15px'}` }}
        >
          {!houseData.is_crolled
            ? houseData.house_cost.month_cost
            : '전화 문의'}
        </P_Manrope_ExtraBold>
        <P_Manrope_Light>{!houseData.is_crolled ? '/월' : ''}</P_Manrope_Light>
      </UpperWrapper>

      <P_Manrope_Regular style={{ textAlign: 'center' }}>
        월세
      </P_Manrope_Regular>
    </Wrapper>
  );
}

export default House_BasicInfos_InfosWrapper_MonthCost;
