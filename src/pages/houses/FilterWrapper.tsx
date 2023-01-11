import styled from 'styled-components';
import BlackPill from '../../components/atoms/BlackPill';
import FilterButton from './FilterButton';

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
      <BlackPill></BlackPill>
      <BlackPill></BlackPill>
      <BlackPill></BlackPill>
      <FilterButton />
    </Wrapper>
  );
}

export default FilterWrapper;
