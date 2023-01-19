import TitleWrapper from '../../components/molecules/TitleWrapper';
import FilterWrapper from './FilterWrapper';
import * as S from './Houses.styled';
import HouseWrapper from './HouseWrapper';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { houseDatasAtom } from '../../store/atoms';
import { useNavigate, useParams } from 'react-router-dom';

function Houses() {
  const navigate = useNavigate();
  const [houseDatas, setHouseDatas] = useRecoilState(houseDatasAtom);
  const { region_id } = useParams();

  const GET_TEST_REGION = gql`
    query {
      fetchHousesByRegion(region_id: ${region_id}) {
        id
        month_cost
        img_urls {
          img_url
        }
        gender
        has_empty
        nearest_main_spot_name
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_TEST_REGION, {
    onCompleted: (data) => {
      console.log(data.fetchHousesByRegion);
      setHouseDatas((current) => data.fetchHousesByRegion);
    },
  });
  console.log(loading);
  // console.log(data.fetchHousesTest);
  if (loading) {
    return (
      <>
        <h1>로딩중!!!</h1>
      </>
    );
  } else {
    return (
      <S.Container>
        <TitleWrapper navigateRoute={'/main'} />
        {/* <FilterWrapper /> */}
        {houseDatas.map((houseData, index) => (
          <HouseWrapper
            key={index}
            onClick={() => {
              navigate(`/house/${houseData.id}`);
            }}
            houseWrapperIndex={index}
          />
        ))}
        {/* <HouseWrapper_OnlyInfos /> */}
      </S.Container>
    );
  }
}

export default Houses;
