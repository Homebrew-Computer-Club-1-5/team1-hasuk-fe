import styled from 'styled-components';
import BlackPill from '../../../components/atoms/BlackPill';

const Wrapper = styled.div``;

function House_HouseIdWrapper() {
  return (
    <Wrapper>
      <BlackPill
        style={{ padding: '0px 20px', width: '130px' }}
        innerText={`등록번호 1234567`}
      ></BlackPill>
    </Wrapper>
  );
}

export default House_HouseIdWrapper;
