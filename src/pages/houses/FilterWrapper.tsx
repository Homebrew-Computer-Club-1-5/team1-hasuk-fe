import styled from 'styled-components';
import BlackPill from '../../components/atoms/BlackPill';
import { ReactComponent as FilterButton } from '../../assets/FilterButton.svg';
import { useRecoilState } from 'recoil';
import { houseDatasAtom } from '../../store/atoms';
import { filterByUpdated } from '../../lib/util/filter';
import { useEffect, useState } from 'react';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  position: relative;
  justify-content: space-evenly;
  align-items: center;
`;

function FilterWrapper() {
  const [houseDatas, setHouseDatas] = useRecoilState(houseDatasAtom);

  const [isFilterByUpdatedClicked, setIsFilterByUpdatedClicked] =
    useState(false);

  useEffect(() => {
    const filteredByUpdatedHouseData = filterByUpdated(
      [...houseDatas],
      'board_date',
    );
    setHouseDatas((current) => filteredByUpdatedHouseData);
  }, [isFilterByUpdatedClicked]);

  const BlackPillStyle = {
    height: '25px',
    lineHeight: '25px',
    fontSize: '15px',
  };

  return (
    <Wrapper>
      <BlackPill
        innerText="최근 업데이트순"
        style={BlackPillStyle}
        onClick={() => {
          setIsFilterByUpdatedClicked((current) => !current);
        }}
      ></BlackPill>
      <BlackPill
        innerText="위치순"
        style={BlackPillStyle}
        onClick={() => {
          console.log(1);
        }}
      ></BlackPill>
      <FilterButton />
    </Wrapper>
  );
}

export default FilterWrapper;
