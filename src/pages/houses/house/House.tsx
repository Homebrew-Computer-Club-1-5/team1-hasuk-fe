import ImgCarousel from '../../../components/molecules/ImgCarousel';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { houseDataAtom } from '../../../store/atoms';
import styled from 'styled-components';
import TitleWrapper from '../../../components/molecules/TitleWrapper';
import BlackPill from '../../../components/atoms/BlackPill';
import House_BasicInfosWrapper from './House_BasicInfosWrapper';
import House_LocationInfoWrapper from './House_LocationInfoWrapper';
import House_OtherInfoWrapper from './House_OtherInfoWrapper';
import House_HouseIdWrapper from './House_HouseIdWrapper';

const Container = styled.div`
  position: relative;
`;

function House() {
  const [houseData, setHouseData] = useRecoilState(houseDataAtom);
  const GET_TEST_HOUSE = gql`
    query {
      fetchHouseTest(house_id: "house1") {
        house_id
        contact_number
        gender
        min_residence
        house_other_info
        has_empty
        img_url
        house_location {
          latitude
          longitude
        }
        cost {
          month_cost
          deposit
          cost_other_info
        }
        category_name
        region_id
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_TEST_HOUSE, {
    onCompleted: (data) => {
      console.log(data.fetchHouseTest);
      setHouseData((current) => data.fetchHouseTest);
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
      <Container>
        <TitleWrapper
          navigateRoute={`/houses/${houseData.region_id}`}
          style={{ position: 'absolute', top: 0, color: 'white', zIndex: 5 }}
        />
        <ImgCarousel
          style={{ borderRadius: '0px' }}
          img_url={houseData.img_url}
        />
        <House_HouseIdWrapper />
        <House_BasicInfosWrapper />
        <House_LocationInfoWrapper />
        <House_OtherInfoWrapper />
      </Container>
    );
  }
}

export default House;
