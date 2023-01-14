import styled from 'styled-components';
import { ReactComponent as HasEmpty } from '../../../assets/HasEmpty.svg';
import P_Manrope_Regular from '../../../components/atoms/P_Manrope_Regular';
import { useRecoilValue } from 'recoil';
import { houseDataAtom } from '../../../store/atoms';

const Wrapper = styled.div`
  text-align: center;
  align-self: flex-end;
`;

function House_BasicInfos_InfosWrapper_HasEmpty() {
  const houseData = useRecoilValue(houseDataAtom);
  return (
    <Wrapper>
      <HasEmpty style={{ width: '25px', height: '25px' }} />
      <P_Manrope_Regular style={{ textAlign: 'center' }}>
        {houseData.has_empty ? '공실 있음' : '공실 없음'}
      </P_Manrope_Regular>
    </Wrapper>
  );
}

export default House_BasicInfos_InfosWrapper_HasEmpty;
