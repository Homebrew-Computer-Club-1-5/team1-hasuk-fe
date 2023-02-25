import { useNavigate } from 'react-router-dom';
import NoticeTextWrapper from '../../../components/molecules/NoticeTextWrapper';
import TitleWrapper2 from '../../../components/molecules/TitleWrapper2';
import * as S from './MyLikedHouse.styled';
import HouseSampleImg from '../../../assets/HouseSampleImg.png';
import P_Manrope_Medium from '../../../components/atoms/P_Manrope_Medium';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { fetchMyHouseAtom } from '../../../store/atoms';
import { statusAtom, tempaddressAtom } from '../../../store/atoms';
import useResetAllAtoms from '../../../lib/util/resetAllAtoms';
import { coordToAddress2 } from '../../../lib/util/coordToAddress';
import useRestoreAccessToken from '../../../lib/util/tokenStrategy';
import Loading from '../../../components/molecules/Loading';
import { FETCH_MY_WISH_HOUSE } from '../../../lib/gql';
import useGetIdxedDBValue from '../../../lib/util/getIdxedDBValue';

function MyLikedHouse() {
  const restoreAccessToken = useRestoreAccessToken();
  const resetAllAtoms = useResetAllAtoms();

  const [fetchMyHouseData, setFetchMyHouseData] =
    useRecoilState(fetchMyHouseAtom);
  const [addresses, setAddresses] = useState<string[]>([]);

  useEffect(() => {
    async function func() {
      const result1 = [];
      for (let i = 0; i < fetchMyHouseData.length; i++) {
        const lat = fetchMyHouseData[i].location.latitude;
        const long = fetchMyHouseData[i].location.longitude;
        const result2: string = await coordToAddress2({
          latitude: lat,
          longitude: long,
        });
        result1.push(result2);
      }
      setAddresses(result1);
    }
    if (fetchMyHouseData) {
      func();
    }
  }, [fetchMyHouseData]);

  // hooks
  const {
    loading: fetchMyHouseLoading,
    error: fetchMyHouseError,
    data,
    refetch: refetchFetchMyHouse,
  } = useQuery(FETCH_MY_WISH_HOUSE, {
    fetchPolicy: 'no-cache',
    onCompleted(data) {
      setFetchMyHouseData(data.fetchMyWishHouses);
    },
    onError(error) {
      console.log('액세스 토큰 만료됨', error.message);
    },
  });

  const navigate = useNavigate();
  const [isDeleteModalOn, setIsDeleteModalOn] = useState(false);

  useEffect(() => {
    resetAllAtoms();
  }, []);

  useEffect(() => {
    if (fetchMyHouseError) {
      console.log('리프레시 실행');
      restoreAccessToken({
        onRestoreSuccess: refetchFetchMyHouse,
      });
    }
  }, [fetchMyHouseError]);

  return (
    <S.Container>
      {fetchMyHouseData.length !== addresses.length ? (
        <Loading loadingText="내 집 정보를 불러오는중.." />
      ) : null}
      <TitleWrapper2
        onClickBackButton={() => {
          navigate('/mypage');
        }}
      />
      <NoticeTextWrapper style={{ marginTop: '30px' }}>
        내가 찜한 방 정보를 관리합니다.
      </NoticeTextWrapper>
      <p>게시물 클릭 시 찜한 게시물을 직접 볼 수 있습니다.</p>
      {fetchMyHouseData[0]
        ? fetchMyHouseData?.map((each, index) => {
            const ad = addresses[index];
            return (
              <S.HouseWrapper
                key={index}
                onClick={() => {
                  navigate(`/house/${each.id}`, {
                    state: {
                      upButton: true,
                      editButton: true,
                      deleteButton: true,
                    },
                  });
                }}
              >
                <S.HouseWrapper_Img
                  src={each.img_urls[0] ? each.img_urls[0] : HouseSampleImg}
                />
                <S.HouseWrapper_InfosWrapper>
                  <P_Manrope_Medium>
                    연락처 : {each.contact_number}
                  </P_Manrope_Medium>
                  <P_Manrope_Medium>주소 : {ad}</P_Manrope_Medium>
                  <P_Manrope_Medium>
                    올린 날짜 : {new Date(each.board_date).toLocaleString()}
                  </P_Manrope_Medium>
                </S.HouseWrapper_InfosWrapper>
              </S.HouseWrapper>
            );
          })
        : null}
    </S.Container>
  );
}

export default MyLikedHouse;
