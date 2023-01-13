import TitleWrapper from '../../components/molecules/TitleWrapper';
import FilterWrapper from './FilterWrapper';
import * as S from './Houses.styled';
import HouseWrapper from './HouseWrapper';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { houseDatasAtom } from '../../store/atoms';

function Houses() {
  const [houseDatas, setHouseDatas] = useRecoilState(houseDatasAtom);
  const GET_TEST_REGION = gql`
    query {
      fetchHousesTest(region_id: "region1") {
        house_id
        month_cost
        main_spot_name
        img_url
        gender
        has_empty
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_TEST_REGION, {
    onCompleted: (data) => {
      console.log(data.fetchHousesTest[0]);
      setHouseDatas((current) => data.fetchHousesTest);
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
        <TitleWrapper />
        <FilterWrapper />
        {houseDatas.map((houseData, index) => (
          <HouseWrapper key={index} houseWrapperIndex={index} />
        ))}
        {/* <HouseWrapper_OnlyInfos /> */}
      </S.Container>
    );
  }
}

export default Houses;
