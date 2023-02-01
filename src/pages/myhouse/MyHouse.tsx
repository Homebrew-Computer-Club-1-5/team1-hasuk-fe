import { useNavigate } from 'react-router-dom';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import TitleWrapper2 from '../../components/molecules/TitleWrapper2';
import * as S from './MyHouse.styled';
import HouseSampleImg from '../../assets/HouseSampleImg.png';
import P_Manrope_Medium from '../../components/atoms/P_Manrope_Medium';
import { ReactComponent as EditButton } from '../../assets/EditButton.svg';
import { ReactComponent as DeleteButton } from '../../assets/DeleteButton.svg';
import { useState } from 'react';
import YesNoModal from '../../components/molecules/YesNoModal';
import { gql, useQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { fetchMyHouseAtom } from '../../store/atoms';

const dummy = [
  {
    img: 'img url',
    contact_number: '01012345678',
    address: '서울시 성북구 안암로 2길 12-3',
    boardDate: '2023-01-25 09:06:55',
  },
  {
    img: 'img url',
    contact_number: '01012345678',
    address: '서울시 성북구 안암로 2길 12-3',
    boardDate: '2023-01-25 09:06:55',
  },
];

const FETCH_MYHOUSE = gql`
  query {
    fetchMyHouse {
      img_urls
      contact_number
      location {
        longitude
        latitude
      }
      boardDate
    }
  }
`;

function MyHouse() {
  const [fetchMyHouseData, setFetchMyHouseData] =
    useRecoilState(fetchMyHouseAtom);
  const { loading, error, data } = useQuery(FETCH_MYHOUSE, {
    onCompleted(data) {
      setFetchMyHouseData(data.fetchMyHouse);
    },
    onError(error) {
      console.log(error);
    },
  });
  const navigate = useNavigate();
  const [isDeleteModalOn, setIsDeleteModalOn] = useState(false);

  if (loading) {
    return (
      <>
        <h1>로딩중!!!</h1>
      </>
    );
  } else {
    return (
      <S.Container>
        <YesNoModal
          innerText={'정말 삭제하시겠습니까?'}
          isModalOn={isDeleteModalOn}
          setIsModalOn={setIsDeleteModalOn}
        />
        <TitleWrapper2
          onClickBackButton={() => {
            navigate('/main');
          }}
        />
        <NoticeTextWrapper style={{ marginTop: '30px' }}>
          내가 올린 방 정보를 관리합니다.
        </NoticeTextWrapper>
        {fetchMyHouseData.map((each, index) => (
          <S.HouseWrapper key={index}>
            <S.HouseWrapper_Img src={HouseSampleImg} />
            <S.HouseWrapper_InfosWrapper>
              <P_Manrope_Medium>
                연락처 : {each.contact_number}
              </P_Manrope_Medium>
              <P_Manrope_Medium>
                주소 : {each.location.latitude}
              </P_Manrope_Medium>
              <P_Manrope_Medium>올린 날짜 : {each.boardDate}</P_Manrope_Medium>
            </S.HouseWrapper_InfosWrapper>
            <S.HouseWrapper_ButtonsWrapper>
              <EditButton
                onClick={() => {
                  console.log('수정페이지로 네비게이트');
                }}
              />
              <DeleteButton
                onClick={() => {
                  setIsDeleteModalOn((current) => !current);
                }}
              />
            </S.HouseWrapper_ButtonsWrapper>
          </S.HouseWrapper>
        ))}
      </S.Container>
    );
  }
}

export default MyHouse;
