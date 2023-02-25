import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { filteredHouseDatasAtom, houseDatasAtom } from '../../store/atoms';
import { useEffect, useState } from 'react';
import PillRadio, { IContent } from '../../components/molecules/PillRadio';

const Container = styled.div`
  position: relative;
  height: 20px;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
`;

interface IFilterWrapper {
  style?: React.CSSProperties;
}

function FilterWrapper({ style }: IFilterWrapper) {
  const [houseDatas, setHouseDatas] = useRecoilState(houseDatasAtom);
  const [filteredHouseDatas, setFilteredHouseDatas] = useRecoilState(
    filteredHouseDatasAtom,
  );

  const [filterState, setFilterState] = useState<number>(1);

  useEffect(() => {
    if (filterState === 1) {
      setHouseDatas((current) => [...current]);
      setFilteredHouseDatas((current) => []);
    } else if (filterState !== 1) {
      const result = houseDatas.filter(
        (houseData) => houseData.house_category_id === filterState,
      );
      if (result[0]) {
        setFilteredHouseDatas((current) => result as any);
      } else {
        setFilteredHouseDatas((current) => [null] as any);
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
    <Container style={style}>
      <PillRadio stuff={filterObjects} defaultValue={1} />
      {/* <FilterButton /> */}
    </Container>
  );
}

export default FilterWrapper;
