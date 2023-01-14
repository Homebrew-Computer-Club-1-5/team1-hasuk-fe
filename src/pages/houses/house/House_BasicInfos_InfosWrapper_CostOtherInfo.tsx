import styled from 'styled-components';
import { ReactComponent as ExtraInfos } from '../../../assets/ExtraInfos.svg';
import P_Manrope_Regular from '../../../components/atoms/P_Manrope_Regular';
import { useRecoilValue } from 'recoil';
import { houseDataAtom } from '../../../store/atoms';

const Wrapper = styled.div`
  text-align: center;
  width: 65px;
  height: 90px;
  position: relative;
`;

function House_BasicInfos_InfosWrapper_CostOtherInfo() {
  const houseData = useRecoilValue(houseDataAtom);
  return (
    <Wrapper>
      <ExtraInfos />
      <P_Manrope_Regular
        style={{ textAlign: 'center', position: 'absolute', bottom: 0 }}
      >
        금액 정보 더보기
      </P_Manrope_Regular>
    </Wrapper>
  );
}

export default House_BasicInfos_InfosWrapper_CostOtherInfo;
