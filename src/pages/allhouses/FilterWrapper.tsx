import styled from 'styled-components';
import { ReactComponent as FilterButton } from '../../assets/FilterButton.svg';
import { useRecoilState } from 'recoil';
import {
  filteredHouseDatas2Atom,
  filteredHouseDatasAtom,
  houseDatas2Atom,
  houseDatasAtom,
} from '../../store/atoms';
import { useEffect, useState } from 'react';
import PillRadio, { IContent } from '../../components/molecules/PillRadio';

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  position: relative;
  justify-content: space-evenly;
  align-items: center;
`;

function FilterWrapper() {
  const [houseDatas, setHouseDatas] = useRecoilState(houseDatas2Atom);
  const [filteredHouseDatas2, setFilteredHouseDatas2] = useRecoilState(
    filteredHouseDatas2Atom,
  );

  const [filterState, setFilterState] = useState<number>(1);

  useEffect(() => {
    if (filterState === 1) {
      setHouseDatas((current) => [...current]);
      setFilteredHouseDatas2((current) => []);
    } else if (filterState !== 1) {
      const result = houseDatas.filter(
        (houseData) => houseData.house_category?.id === filterState,
      );
      if (result[0]) {
        setFilteredHouseDatas2((current) => result as any);
      } else {
        setFilteredHouseDatas2((current) => [null] as any);
      }
    }
  }, [filterState]);

  const filterObjects: IContent[] = [
    {
      text: '전체',
      value: 1,
      onClickPill: () => {
        setFilterState((current) => 1);
      },
    },
    {
      text: '하숙',
      value: 2,
      onClickPill: () => {
        setFilterState((current) => 2);
      },
    },
    {
      text: '자취방/원룸',
      value: 3,
      onClickPill: () => {
        setFilterState((current) => 3);
      },
    },
    {
      text: '고시원',
      value: 4,
      onClickPill: () => {
        setFilterState((current) => 4);
      },
    },
    {
      text: '기타',
      value: 5,
      onClickPill: () => {
        setFilterState((current) => 5);
      },
    },
  ];

  return (
    <Container>
      <PillRadio stuff={filterObjects} defaultValue={1} />
      {/* <FilterButton /> */}
    </Container>
  );
}

export default FilterWrapper;
