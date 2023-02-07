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
import InfoModal from '../../../components/molecules/InfoModal';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useResetAllAtoms from '../../../lib/util/resetAllAtoms';
import Loading from '../../../components/molecules/Loading';

const Container = styled.div`
  position: relative;
`;

function House() {
  const resetAllAtoms = useResetAllAtoms();
  useEffect(() => {
    resetAllAtoms();
  }, []);
  const [isContactNumberModalOn, setIsContactNumberModalOn] = useState(false);
  const [isCostOtherInfoModalOn, setIsCostOtherInfoModalOn] = useState(false);
  const [houseData, setHouseData] = useRecoilState(houseDataAtom);
  const { house_id } = useParams();
  const GET_TEST_HOUSE = gql`
    query {
      fetchHouse(house_id: ${house_id}) {
        id
        contact_number
        is_crolled
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
        house_cost {
          month_cost
          deposit
          other_info
        }
        house_category {
          name
          id
        }
        region {
          id
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_TEST_HOUSE, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setHouseData((current) => data.fetchHouse);
    },
  });

  if (loading) {
    return <Loading loadingText="집 정보를 불러오는 중.." />;
  } else {
    const imgs = houseData.imgs;
    const img_url = imgs?.map((each) => each.img_url);

    return (
      <Container>
        {loading ? <Loading loadingText="집 정보를 불러오는 중.." /> : null}
        <InfoModal
          innerText={`전화번호 : ${houseData.contact_number}`}
          isModalOn={isContactNumberModalOn}
          setIsModalOn={setIsContactNumberModalOn}
        />
        <InfoModal
          innerText={`금액 관련 기타 정보 :  ${
            houseData.house_cost?.other_info
              ? houseData.house_cost?.other_info
              : '금액 관련 기타 정보가 없습니다.'
          }`}
          isModalOn={isCostOtherInfoModalOn}
          setIsModalOn={setIsCostOtherInfoModalOn}
        />
        <TitleWrapper
          isBackButtonColorBlack={false}
          navigateRoute={
            houseData.region?.id
              ? `/houses/${houseData.region?.id}`
              : '/exhouses'
          }
          style={{ position: 'absolute', top: 0, color: 'white', zIndex: 5 }}
          isTitleOn={false}
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
        <ImgCarousel
          style={{ borderRadius: '0px' }}
          img_url={img_url ? img_url : []}
        />
        <House_HouseIdWrapper />
        <House_BasicInfosWrapper
          setIsCostOtherInfoModalOn={setIsCostOtherInfoModalOn}
        />
        {houseData.house_location &&
        (houseData.house_location as any).longitude !== 0 &&
        (houseData.house_location as any).latitude !== 0 ? (
          <House_LocationInfoWrapper />
        ) : null}
        <House_OtherInfoWrapper />
      </Container>
    );
  }
}

export default House;
