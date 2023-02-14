import TitleWrapper from '../../components/molecules/TitleWrapper';
import * as S from './Houses.styled';
import HouseWrapper from './HouseWrapper';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { fetchCrawledHousesAtom, houseDatasAtom } from '../../store/atoms';
import { useNavigate, useParams } from 'react-router-dom';
import useResetAllAtoms from '../../lib/util/resetAllAtoms';
import { useEffect } from 'react';
import Loading from '../../components/molecules/Loading';
import { FETCH_CRAWLED_HOUSES } from '../../lib/gql';

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

  const { loading, error, data } = useQuery(FETCH_CRAWLED_HOUSES, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setFetchCrawledHousesData((current) => data.fetchCrawledHouses);
    },
  });
  return (
    <S.Container>
      {loading ? <Loading loadingText="기타 집 정보를 불러오는중.." /> : null}
      <TitleWrapper
        navigateRoute={'/'}
        isTitleOn={false}
        isBackButtonColorBlack={true}
        titleText="기타 집 정보"
      />
      <p style={{ textAlign: 'center' }}>
        ** 일부 정보는 고파스 게시물을 참조 했음을 밝힙니다. **
      </p>
      {fetchCrawledHousesData.map((house, index) => (
        <HouseWrapper
          key={index}
          onClick={() => {
            navigate(`/house/${house.id}`);
          }}
          houseWrapperIndex={index}
        />
      ))}
    </S.Container>
  );
}

export default ExHouses;
