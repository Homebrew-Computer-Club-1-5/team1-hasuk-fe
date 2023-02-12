import ImgCarousel from '../../../components/molecules/ImgCarousel';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  houseDataAtom,
  IfetchMyHouse,
  isEditingAtom,
  isUppingAtom,
  statusAtom,
} from '../../../store/atoms';
import TitleWrapper from '../../../components/molecules/TitleWrapper';
import House_BasicInfosWrapper from './House_BasicInfosWrapper';
import House_LocationInfoWrapper from './House_LocationInfoWrapper';
import House_OtherInfoWrapper from './House_OtherInfoWrapper';
import House_HouseIdWrapper from './House_HouseIdWrapper';
import { ReactComponent as ContactButton } from '../../../assets/ContactButton.svg';
import InfoModal from '../../../components/molecules/InfoModal';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useResetAllAtoms from '../../../lib/util/resetAllAtoms';
import Loading from '../../../components/molecules/Loading';
import { DELETE_MYHOUSE, FETCH_HOUSE, FETCH_UP } from '../../../lib/gql';
import WhitePill from '../../../components/molecules/WhitePill';
import * as S from './House.styled';
import useRestoreAccessToken from '../../../lib/util/tokenStrategy';
import { convertTimestamp } from '../../../lib/util/time';
import useSetEditPage from '../../../lib/util/setEditPage';
import { coordToAddress2 } from '../../../lib/util/coordToAddress';
import { isEmptyObject } from '../../../lib/util/javascript';

function House() {
  // state
  const [isContactNumberModalOn, setIsContactNumberModalOn] = useState(false);
  const [isCostOtherInfoModalOn, setIsCostOtherInfoModalOn] = useState(false);
  const [houseData, setHouseData] = useRecoilState(houseDataAtom);
  const isUpping = useRecoilValue(isUppingAtom);
  const [isEditing, setIsEditing] = useRecoilState(isEditingAtom);
  const [address, setAddress] = useState<string>();
  const setStat = useSetRecoilState(statusAtom);

  // hooks
  const setEditPage = useSetEditPage();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { house_id } = useParams();
  const resetAllAtoms = useResetAllAtoms();
  const restoreAccessToken = useRestoreAccessToken();
  const {
    loading: fetchHouseLoading,
    error,
    data,
  } = useQuery(FETCH_HOUSE, {
    fetchPolicy: 'no-cache',
    variables: {
      house_id: parseFloat(house_id as any),
    },
    onCompleted: (data) => {
      setHouseData((current) => data.fetchHouse);
    },
  });
  const [fetchUp, { loading: fetchUpLoading }] = useMutation(FETCH_UP, {
    onCompleted(data) {
      if (data.fetchUp.id) {
        alert(
          `${data.fetchUp.id} 번집 ${data.fetchUp.board_date} 시에 UP 완료`,
        );
        window.location.reload();
      } else {
        alert('3일안에 UP하셔서 UP 하실 수 없습니다.');
      }
    },
    onError(error) {
      console.log(error.message);
      restoreAccessToken({
        onRestoreSuccess: fetchUp,
      });
    },
  });

  const [deleteMyHouse, { loading: loading2, error: deleteMyHouseError }] =
    useMutation(DELETE_MYHOUSE, {
      onCompleted(data) {
        if (data.deleteMyHouse === 'success') {
          alert('게시물 삭제 완료');
          navigate('/myhouse');
        } else if (data.deleteMyHouse === 'failed') {
          alert('게시물 삭제 실패');
        }
      },
      onError(error, clientOptions) {
        alert('게시물 삭제 실패');
      },
    });

  // useEffects
  useEffect(() => {
    resetAllAtoms();
  }, []);

  useEffect(() => {
    async function func() {
      const location = {
        longitude: houseData.house_location.longitude,
        latitude: houseData.house_location.latitude,
      };
      const addressResult = await coordToAddress2(location);
      setAddress(addressResult);
    }
    if (!isEmptyObject(houseData)) func();
  }, [houseData]);

  // etc
  // board_date => 보기 쉽게
  const currentTime = Date.now();
  const { days, hours, minutes, totalSeconds } = convertTimestamp(
    currentTime - houseData.board_date,
  );
  const imgs = houseData.imgs;
  const img_urls = imgs?.map((each) => each.img_url);

  //

  if (fetchHouseLoading) {
    return <Loading loadingText="집 정보를 불러오는 중.." />;
  } else {
    return (
      <S.Container>
        {fetchHouseLoading ? (
          <Loading loadingText="집 정보를 불러오는 중.." />
        ) : null}
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
        <S.Header>
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
        </S.Header>
        <S.Main>
          <ImgCarousel
            style={{ borderRadius: '0px' }}
            img_url={img_urls ? img_urls : []}
          />
          <S.Article>
            <House_HouseIdWrapper />
            <S.BoardDateP>
              최근 업데이트 :{' '}
              {days !== 0
                ? `${days}일전 `
                : days === 0 && hours !== 0
                ? `${hours}시간전 `
                : days === 0 && hours === 0 && minutes !== 0
                ? `${minutes}분전 `
                : `${totalSeconds}초전 `}
            </S.BoardDateP>
            <House_BasicInfosWrapper
              setIsCostOtherInfoModalOn={setIsCostOtherInfoModalOn}
            />
            {houseData.house_location &&
            (houseData.house_location as any).longitude !== 0 &&
            (houseData.house_location as any).latitude !== 0 ? (
              <House_LocationInfoWrapper />
            ) : null}
            <House_OtherInfoWrapper />
          </S.Article>
          {state ? (
            <S.UpWrapper>
              {state.upButton || state.fromCreate ? (
                <WhitePill
                  text="UP 하기"
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                  }}
                  onClick={() => {
                    fetchUp({
                      variables: {
                        house_id: parseFloat(house_id as any),
                      },
                    });
                  }}
                />
              ) : null}
              {state.editButton ? (
                <WhitePill
                  text="수정 하기"
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                  }}
                  onClick={() => {
                    const houseDataForSetEditPage: IfetchMyHouse = {
                      id: houseData.id,
                      img_urls: img_urls,
                      contact_number: houseData.contact_number,
                      gender: houseData.gender,
                      house_other_info: houseData.house_other_info,
                      region: houseData.region.id,
                      cost: houseData.house_cost,
                      house_category: houseData.house_category.id,
                      board_date: houseData.board_date,
                      location: {
                        longitude: houseData.house_location.longitude,
                        latitude: houseData.house_location.latitude,
                      },
                    };
                    setIsEditing((current) => true);
                    // setStat({ status: 2 });

                    navigate('/create');
                    setEditPage({
                      houseData: houseDataForSetEditPage,
                      address: address as any,
                    });
                  }}
                />
              ) : null}
              {state.deleteButton ? (
                <WhitePill
                  text="삭제 하기"
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                  }}
                  onClick={() => {
                    // 삭제 모달창 뜨고
                    const result = window.confirm('정말 삭제 하시겠습니까?');
                    if (result) {
                      deleteMyHouse({
                        variables: {
                          house_id: house_id,
                        },
                      });
                    }
                  }}
                />
              ) : null}
            </S.UpWrapper>
          ) : null}
        </S.Main>
      </S.Container>
    );
  }
}

export default House;
