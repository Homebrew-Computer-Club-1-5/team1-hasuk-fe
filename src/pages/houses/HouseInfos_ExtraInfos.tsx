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
  const category = houseDatas[houseWrapperIndex].house_category_id;
  return (
    <Wrapper>
      <P_Manrope_Bold>
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
      <P_Manrope_Light>
        {houseDatas[houseWrapperIndex].gender === 0
          ? '남성 전용'
          : houseDatas[houseWrapperIndex].gender === 1
          ? '여성 전용'
          : '남녀 공용'}
      </P_Manrope_Light>
      <P_Manrope_Light>
        {`${houseDatas[houseWrapperIndex].nearest_main_spot_name}주변`}
      </P_Manrope_Light>
    </Wrapper>
  );
}

export default HouseInfos_ExtraInfos;
