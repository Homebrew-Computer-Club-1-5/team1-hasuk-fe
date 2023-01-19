import ImgCarousel from '../../../components/molecules/ImgCarousel';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { houseDataAtom } from '../../../store/atoms';
import styled from 'styled-components';
import TitleWrapper from '../../../components/molecules/TitleWrapper';
import House_BasicInfosWrapper from './House_BasicInfosWrapper';
import House_LocationInfoWrapper from './House_LocationInfoWrapper';
import House_OtherInfoWrapper from './House_OtherInfoWrapper';
import House_HouseIdWrapper from './House_HouseIdWrapper';
import { ReactComponent as ContactButton } from '../../../assets/ContactButton.svg';
import Modal from '../../../components/molecules/Modal';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  position: relative;
`;

function House() {
  const [isContactNumberModalOn, setIsContactNumberModalOn] = useState(false);
  const [isCostOtherInfoModalOn, setIsCostOtherInfoModalOn] = useState(false);
  const [houseData, setHouseData] = useRecoilState(houseDataAtom);
  const { house_id } = useParams();
  const GET_TEST_HOUSE = gql`
    query {
      fetchHouse(house_id: ${house_id}) {
        id
        contact_number
        gender
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
        <Modal
          innerText={`전화번호 : ${houseData.contact_number}`}
          isModalOn={isContactNumberModalOn}
          setIsModalOn={setIsContactNumberModalOn}
        />
        <Modal
          innerText={`금액 관련 기타 정보 :  ${houseData.cost.other_info}`}
          isModalOn={isCostOtherInfoModalOn}
          setIsModalOn={setIsCostOtherInfoModalOn}
        />
        <TitleWrapper
          navigateRoute={`/houses/${houseData.region.id}`}
          style={{ position: 'absolute', top: 0, color: 'white', zIndex: 5 }}
        />
        <ContactButton
          style={{
            position: 'absolute',
            zIndex: '100',
            right: '10px',
            top: '-5px',
            width: '40px',
          }}
          onClick={() => {
            setIsContactNumberModalOn((current) => !current);
          }}
        />
        <ImgCarousel style={{ borderRadius: '0px' }} img_url={img_url} />
        <House_HouseIdWrapper />
        <House_BasicInfosWrapper
          setIsCostOtherInfoModalOn={setIsCostOtherInfoModalOn}
        />
        <House_LocationInfoWrapper />
        <House_OtherInfoWrapper />
      </Container>
    );
  }
}

export default House;
