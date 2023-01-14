import styled from 'styled-components';
import P_Manrope_Bold from '../../components/atoms/P_Manrope_Bold';
import P_Manrope_Light from '../../components/atoms/P_Manrope_Light';
import { useRecoilValue } from 'recoil';
import { houseDatasAtom } from '../../store/atoms';

const Wrapper = styled.div`
  display: absolute;
  left: 0;
`;

interface IHouseInfos_ExtraInfos {
  houseWrapperIndex: number;
}

function HouseInfos_ExtraInfos({ houseWrapperIndex }: IHouseInfos_ExtraInfos) {
  const houseDatas = useRecoilValue(houseDatasAtom);

  return (
    <Wrapper>
      <P_Manrope_Bold>
        {houseDatas[houseWrapperIndex].has_empty ? '공실 있음' : '공실 없음'}
      </P_Manrope_Bold>
      <P_Manrope_Light>
        {houseDatas[houseWrapperIndex].gender === 0
          ? '남성 전용'
          : houseDatas[houseWrapperIndex].gender === 1
          ? '여성 전용'
          : '남녀 공용'}
      </P_Manrope_Light>
      <P_Manrope_Light>
        {`${houseDatas[houseWrapperIndex].main_spot_name}주변`}
      </P_Manrope_Light>
    </Wrapper>
  );
}

export default HouseInfos_ExtraInfos;
