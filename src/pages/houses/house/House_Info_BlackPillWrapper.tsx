import styled from 'styled-components';
import BlackPill from '../../../components/atoms/BlackPill';

const Wrapper = styled.div`
  padding-left: 10px;
`;

interface IHouse_Info_BlackPillWrapper {
  innerText: string;
}

function House_Info_BlackPillWrapper({
  innerText,
}: IHouse_Info_BlackPillWrapper) {
  return (
    <Wrapper>
      <BlackPill innerText={innerText}></BlackPill>
    </Wrapper>
  );
}

export default House_Info_BlackPillWrapper;
