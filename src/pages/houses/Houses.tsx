import TitleWrapper from '../../components/molecules/TitleWrapper';
import FilterWrapper from './FilterWrapper';
import * as S from './Houses.styled';
import HouseWrapper from './HouseWrapper';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { houseDatasAtom } from '../../store/atoms';
import { useNavigate, useParams } from 'react-router-dom';
import useResetAllAtoms from '../../lib/util/resetAllAtoms';
import { useEffect } from 'react';
import ExtraHousesButton from '../../components/molecules/ExtraHousesButton';
import Loading from '../../components/molecules/Loading';

function Houses() {
  const resetAllAtoms = useResetAllAtoms();
  useEffect(() => {
    resetAllAtoms();
  }, []);

  const navigate = useNavigate();
  const [houseDatas, setHouseDatas] = useRecoilState(houseDatasAtom);
  const { region_id } = useParams();

  const GET_TEST_REGION = gql`
    query {
      fetchHousesByRegion(region_id: ${region_id}) {
        region_name
        id
        month_cost
        img_urls
        gender
        has_empty
        nearest_main_spot_name
        house_category_id
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_TEST_REGION, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setHouseDatas((current) => data.fetchHousesByRegion);
    },
  });

  return (
    <S.Container>
      {loading ? <Loading /> : null}
      <TitleWrapper
        navigateRoute={'/main'}
        isTitleOn={true}
        isBackButtonColorBlack={true}
      />
      <ExtraHousesButton
        onClick={() => {
          navigate('/exhouses');
        }}
      />
      {/* <FilterWrapper /> */}
      {houseDatas[0]
        ? houseDatas.map((houseData, index) => (
            <HouseWrapper
              key={index}
              onClick={() => {
                navigate(`/house/${houseData.id}`);
              }}
              houseWrapperIndex={index}
            />
          ))
        : null}
    </S.Container>
  );
}

export default Houses;
