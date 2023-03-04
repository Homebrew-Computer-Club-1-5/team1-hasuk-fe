import styled from 'styled-components';
import P_Manrope_ExtraBold from '../../../components/atoms/P_Manrope_ExtraBold';
import P_Manrope_Regular from '../../../components/atoms/P_Manrope_Regular';
import { useRecoilValue } from 'recoil';
import { houseDataAtom } from '../../../store/atoms';

const Wrapper = styled.div`
  width: 65px;
  height: 90px;
  position: relative;
  text-align: center;
`;

function House_BasicInfos_InfosWrapper_Deposit() {
  const houseData = useRecoilValue(houseDataAtom);
  return (
    <Wrapper>
      <P_Manrope_ExtraBold
        style={{
          fontSize: `${houseData.is_crolled === 0 ? '35px' : '15px'}`,
        }}
      >
        {houseData.is_crolled === 0
          ? houseData.house_cost.deposit
          : '전화 문의'}
      </P_Manrope_ExtraBold>
      <P_Manrope_Regular
        style={{
          textAlign: 'center',
          position: 'absolute',
          left: '50%',
          width: '50px',
          transform: 'translate(-50%,0%)',
        }}
      >
        보증금
      </P_Manrope_Regular>
    </Wrapper>
  );
}

export default House_BasicInfos_InfosWrapper_Deposit;
