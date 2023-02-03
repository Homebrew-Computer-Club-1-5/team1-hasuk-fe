import styled from 'styled-components';
import BlackPill from '../../components/atoms/BlackPill';
import { ReactComponent as FilterButton } from '../../assets/FilterButton.svg';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 30px 10px;
  display: flex;
  position: relative;
  justify-content: space-evenly;
  align-items: center;
`;

function FilterWrapper() {
  return (
    <Wrapper>
      <BlackPill innerText="금액"></BlackPill>
      <BlackPill innerText="공실"></BlackPill>
      <BlackPill innerText="위치"></BlackPill>
      <FilterButton />
    </Wrapper>
  );
}

export default FilterWrapper;
