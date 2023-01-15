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
      fetchHouse(house_id: 1) {
        id
        contact_number
        gender
        min_residence
        house_other_info
        has_empty
        imgs {
          img_url
        }
        house_location {
          latitude
          longitude
        }
        cost {
          month_cost
          deposit
          other_info
        }
        house_category {
          name
        }
        region {
          id
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_TEST_HOUSE, {
    onCompleted: (data) => {
      console.log(data.fetchHouse);
      setHouseData((current) => data.fetchHouse);
    },
  });

  if (loading) {
    return (
      <>
        <h1>로딩중!!!</h1>
      </>
    );
  } else {
    const imgs = houseData.imgs;
    const img_url = imgs.map((each) => each.img_url);

    return (
      <Container>
        <TitleWrapper
          navigateRoute={`/houses/${houseData.region.id}`}
          style={{ position: 'absolute', top: 0, color: 'white', zIndex: 5 }}
        />
        <ImgCarousel style={{ borderRadius: '0px' }} img_url={img_url} />
        <House_HouseIdWrapper />
        <House_BasicInfosWrapper />
        <House_LocationInfoWrapper />
        <House_OtherInfoWrapper />
      </Container>
    );
  }
}

export default House;
