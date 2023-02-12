import TitleWrapper from '../../components/molecules/TitleWrapper';
import * as S from '../houses/Houses.styled';
import { useQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import {
  filteredHouseDatas2Atom,
  houseDatas2Atom,
  isHousesFirstLoadedAtom,
} from '../../store/atoms';
import { useNavigate, useParams } from 'react-router-dom';
import useResetAllAtoms from '../../lib/util/resetAllAtoms';
import { useEffect, useState } from 'react';
import ExtraHousesButton from '../../components/molecules/ExtraHousesButton';
import Loading from '../../components/molecules/Loading';
import { FETCH_ALL_HOUSES } from '../../lib/gql';
import { filterByUpdated } from '../../lib/util/filter';
import HouseWrapper from './HouseWrapper';
import FilterWrapper from './FilterWrapper';

function AllHouses() {
  const navigate = useNavigate();
  const { region_id } = useParams();

  const [Main, setMain] = useState();
  const resetAllAtoms = useResetAllAtoms();
  const [houseDatas, setHouseDatas] = useRecoilState(houseDatas2Atom);
  const [filteredHouseDatas2, setFilteredHouseDatas2] = useRecoilState(
    filteredHouseDatas2Atom,
  );

  const { loading, error, data } = useQuery(FETCH_ALL_HOUSES, {
    fetchPolicy: 'no-cache',
    variables: {
      region_id: parseFloat(region_id as string),
    },
    onCompleted: (data) => {
      const filteredByUpdatedHouseData = filterByUpdated(
        [...data.fetchAllHouses],
        'board_date',
      );
      setHouseDatas((current) => filteredByUpdatedHouseData);
    },
  });

  useEffect(() => {
    resetAllAtoms();
  }, []);

  useEffect(() => {}, [houseDatas, filteredHouseDatas2]);

  return (
    <S.Container>
      {loading ? <Loading /> : null}
      <S.Header>
        <TitleWrapper
          navigateRoute={'/'}
          isTitleOn={true}
          isBackButtonColorBlack={true}
        />
        <S.NoticeP>
          ** 일부 정보는 고파스 게시물을 참조 했음을 밝힙니다. **
        </S.NoticeP>
        <ExtraHousesButton
          onClick={() => {
            navigate('/exhouses');
          }}
        />
        <FilterWrapper />
      </S.Header>
      <S.Main>
        {filteredHouseDatas2[0]
          ? filteredHouseDatas2.map((filteredHouseData, index) => (
              <HouseWrapper key={index} houseData={filteredHouseData} />
            ))
          : !filteredHouseDatas2[0] && filteredHouseDatas2[0] !== null // 첫 로딩시
          ? houseDatas.map((houseData, index) => (
              <HouseWrapper key={index} houseData={houseData} />
            ))
          : filteredHouseDatas2[0] === null
          ? null
          : null}
        {filteredHouseDatas2[0] === null ? (
          <S.HouseNotExistsWrapper>
            <p>해당하는 집이</p>
            <p>존재하지 않습니다 :{'('}</p>
          </S.HouseNotExistsWrapper>
        ) : null}
      </S.Main>
    </S.Container>
  );
}

export default AllHouses;
