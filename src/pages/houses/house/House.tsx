import ImgCarousel from '../../../components/molecules/ImgCarousel';
import { useQuery, gql } from '@apollo/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { houseDataAtom, isUppingAtom } from '../../../store/atoms';
import styled from 'styled-components';
import TitleWrapper from '../../../components/molecules/TitleWrapper';
import House_BasicInfosWrapper from './House_BasicInfosWrapper';
import House_LocationInfoWrapper from './House_LocationInfoWrapper';
import House_OtherInfoWrapper from './House_OtherInfoWrapper';
import House_HouseIdWrapper from './House_HouseIdWrapper';
import { ReactComponent as ContactButton } from '../../../assets/ContactButton.svg';
import InfoModal from '../../../components/molecules/InfoModal';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useResetAllAtoms from '../../../lib/util/resetAllAtoms';
import Loading from '../../../components/molecules/Loading';
import { FETCH_HOUSE } from '../../../lib/gql';
import WhitePill from '../../../components/molecules/WhitePill';
import * as S from './House.styled';

function House() {
  const isUpping = useRecoilValue(isUppingAtom);
  const { state } = useLocation();
  console.log(state?.fromUp);
  const resetAllAtoms = useResetAllAtoms();
  useEffect(() => {
    resetAllAtoms();
  }, []);
  const [isContactNumberModalOn, setIsContactNumberModalOn] = useState(false);
  const [isCostOtherInfoModalOn, setIsCostOtherInfoModalOn] = useState(false);
  const [houseData, setHouseData] = useRecoilState(houseDataAtom);
  const { house_id } = useParams();

  const { loading, error, data } = useQuery(FETCH_HOUSE, {
    fetchPolicy: 'no-cache',
    variables: {
      house_id: parseFloat(house_id as any),
    },
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
      <S.Container>
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
        {state?.fromUp ? (
          <S.UpWrapper>
            <WhitePill
              text="UP 하기"
              style={{
                backgroundColor: 'black',
                color: 'white',
              }}
              onClick={() => {
                console.log('up!!!');
              }}
            />
            <WhitePill
              text="게시물 수정"
              style={{
                backgroundColor: 'black',
                color: 'white',
              }}
              onClick={() => {
                console.log('수정');
              }}
            />
          </S.UpWrapper>
        ) : null}
      </S.Container>
    );
  }
}

export default House;
