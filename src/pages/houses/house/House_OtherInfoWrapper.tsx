import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { houseDataAtom } from '../../../store/atoms';
import House_Info_BlackPillWrapper from './House_Info_BlackPillWrapper';
import House_OtherInfoWrapper_TextBox from './House_OtherInfoWrapper_TextBox';

const Wrapper = styled.div``;

function House_OtherInfoWrapper() {
  const houseData = useRecoilValue(houseDataAtom);
  return (
    <Wrapper>
      <House_Info_BlackPillWrapper innerText="기타" />
      <House_OtherInfoWrapper_TextBox innerText={houseData.house_other_info} />
    </Wrapper>
  );
}

export default House_OtherInfoWrapper;
