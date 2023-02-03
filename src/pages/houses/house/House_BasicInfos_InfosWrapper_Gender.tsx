import styled from 'styled-components';
import { ReactComponent as Gender } from '../../../assets/Gender.svg';
import P_Manrope_Regular from '../../../components/atoms/P_Manrope_Regular';
import { useRecoilValue } from 'recoil';
import { houseDataAtom } from '../../../store/atoms';

const Wrapper = styled.div`
  text-align: center;
  align-self: flex-end;
`;

function House_BasicInfos_InfosWrapper_Gender() {
  const houseData = useRecoilValue(houseDataAtom);

  return (
    <Wrapper>
      <Gender style={{ width: '25px', height: '25px' }} />
      <P_Manrope_Regular style={{ textAlign: 'center' }}>
        {houseData.gender === 0
          ? '남성 전용'
          : houseData.gender === 1
          ? '여성 전용'
          : houseData.gender === 2
          ? '남녀 공용'
          : '전화 문의'}
      </P_Manrope_Regular>
    </Wrapper>
  );
}

export default House_BasicInfos_InfosWrapper_Gender;
