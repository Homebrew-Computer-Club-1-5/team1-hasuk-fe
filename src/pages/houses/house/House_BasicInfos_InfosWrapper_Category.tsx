import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { houseDataAtom } from '../../../store/atoms';
import { ReactComponent as HouseCategory } from '../../../assets/HouseCategory.svg';
import P_Manrope_Regular from '../../../components/atoms/P_Manrope_Regular';
import P_Manrope_ExtraBold from '../../../components/atoms/P_Manrope_ExtraBold';

const Wrapper = styled.div`
  position: relative;
  top: 4px;
`;

function House_BasicInfos_InfosWrapper_Category() {
  const [houseData, setHouseData] = useRecoilState(houseDataAtom);
  const category = houseData.house_category.id;
  return (
    <Wrapper>
      {/* <HouseCategory style={{ width: '25px', height: '25px' }} /> */}
      <P_Manrope_ExtraBold style={{ textAlign: 'center' }}>
        {category === 1
          ? '일반'
          : category === 2
          ? '하숙'
          : category === 3
          ? '자취방/원룸'
          : category === 4
          ? '고시원'
          : '기타'}
      </P_Manrope_ExtraBold>
      <P_Manrope_Regular style={{ textAlign: 'center' }}>
        카테고리
      </P_Manrope_Regular>
    </Wrapper>
  );
}

export default House_BasicInfos_InfosWrapper_Category;
