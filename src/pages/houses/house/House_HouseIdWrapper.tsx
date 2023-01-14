import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import BlackPill from '../../../components/atoms/BlackPill';
import { houseDataAtom } from '../../../store/atoms';

const Wrapper = styled.div``;

function House_HouseIdWrapper() {
  const houseData = useRecoilValue(houseDataAtom);
  return (
    <Wrapper>
      <BlackPill
        style={{ padding: '0px 20px', width: '130px' }}
        innerText={`등록번호 ${houseData.house_id}`}
      ></BlackPill>
    </Wrapper>
  );
}

export default House_HouseIdWrapper;
