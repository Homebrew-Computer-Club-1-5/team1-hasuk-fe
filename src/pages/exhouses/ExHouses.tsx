import TitleWrapper from '../../components/molecules/TitleWrapper';
import * as S from './Houses.styled';
import HouseWrapper from './HouseWrapper';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { fetchCrawledHousesAtom, houseDatasAtom } from '../../store/atoms';
import { useNavigate, useParams } from 'react-router-dom';
import useResetAllAtoms from '../../lib/util/resetAllAtoms';
import { useEffect } from 'react';
import ExtraHousesButton from '../../components/molecules/ExtraHousesButton';

function ExHouses() {
  const resetAllAtoms = useResetAllAtoms();
  useEffect(() => {
    resetAllAtoms();
  }, []);

  const navigate = useNavigate();
  const [fetchCrawledHousesData, setFetchCrawledHousesData] = useRecoilState(
    fetchCrawledHousesAtom,
  );
  const { region_id } = useParams();

  const FETCH_CRAWLED_HOUSES = gql`
    query {
      fetchCrawledHouses {
        id
        img_urls
      }
    }
  `;

  const { loading, error, data } = useQuery(FETCH_CRAWLED_HOUSES, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      console.log(data.fetchCrawledHouses);
      setFetchCrawledHousesData((current) => data.fetchCrawledHouses);
    },
  });
  if (loading) {
    return (
      <>
        <h1>로딩중!!!</h1>
      </>
    );
  } else {
    return (
      <S.Container>
        <TitleWrapper
          navigateRoute={'/main'}
          isTitleOn={false}
          isBackButtonColorBlack={true}
          titleText="기타 집 정보"
        />
        {/* <FilterWrapper /> */}
        {fetchCrawledHousesData.map((house, index) => (
          <HouseWrapper
            key={index}
            onClick={() => {
              navigate(`/house/${house.id}`);
            }}
            houseWrapperIndex={index}
          />
        ))}
        {/* <HouseWrapper_OnlyInfos /> */}
      </S.Container>
    );
  }
}

export default ExHouses;
