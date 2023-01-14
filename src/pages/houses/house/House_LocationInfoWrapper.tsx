import { useRecoilValue } from 'recoil';
import { houseDataAtom } from '../../../store/atoms';
import styled from 'styled-components';
import House_Info_BlackPillWrapper from './House_Info_BlackPillWrapper';
import House_LocationInfoWrapper_Map from './House_LocationInfoWrapper_Map';

const Wrapper = styled.div``;

function House_LocationInfoWrapper() {
  const houseData = useRecoilValue(houseDataAtom);
  return (
    <Wrapper>
      <House_Info_BlackPillWrapper innerText="위치" />
      <House_LocationInfoWrapper_Map
        house_location={houseData.house_location}
      />
    </Wrapper>
  );
}

export default House_LocationInfoWrapper;