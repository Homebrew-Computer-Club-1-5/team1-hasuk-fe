import { useNavigate } from 'react-router-dom';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import TitleWrapper2 from '../../components/molecules/TitleWrapper2';
import * as S from './MyHouse.styled';
import HouseSampleImg from '../../assets/HouseSampleImg.png';
import P_Manrope_Medium from '../../components/atoms/P_Manrope_Medium';
import { ReactComponent as EditButton } from '../../assets/EditButton.svg';
import { ReactComponent as DeleteButton } from '../../assets/DeleteButton.svg';
import { useEffect, useState } from 'react';
import YesNoModal from '../../components/molecules/YesNoModal';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import {
  clickedHouse_idAtom,
  fetchMyHouseAtom,
  IfetchMyHouse,
  myHouseAddressAtom,
} from '../../store/atoms';
import {
  contactNumberAtom,
  costOtherInfoAtom,
  depositAtom,
  genderAtom,
  houseCategoryIdAtom,
  houseOtherInfoAtom,
  isEditingAtom,
  latitudeAtom,
  longitudeAtom,
  monthCostAtom,
  previewAtom,
  regionIdAtom,
  statusAtom,
  tempaddressAtom,
  universityIdAtom,
} from '../../store/atoms';
import useResetAllAtoms from '../../lib/util/resetAllAtoms';
// import useCoordToAddress from '../../lib/util/coordToAddress';
import { coordToAddress2 } from '../../lib/util/coordToAddress';
import useRestoreAccessToken from '../../lib/util/tokenStrategy';
import Loading from '../../components/molecules/Loading';
import { DELETE_MYHOUSE, FETCH_MYHOUSE } from '../../lib/gql';

function MyHouse() {
  const restoreAccessToken = useRestoreAccessToken();
  const resetAllAtoms = useResetAllAtoms();
  const [contact, setContact] = useRecoilState(contactNumberAtom);
  const [univ, setUniv] = useRecoilState(universityIdAtom);
  const [region, setRegion] = useRecoilState(regionIdAtom);
  const [lat, setLat] = useRecoilState(latitudeAtom);
  const [long, setLong] = useRecoilState(longitudeAtom);
  const [month, setMonth] = useRecoilState(monthCostAtom);
  const [depo, setDepo] = useRecoilState(depositAtom);
  const [costother, setCostother] = useRecoilState(costOtherInfoAtom);
  const [gen, setGen] = useRecoilState(genderAtom);
  const [cat, setCat] = useRecoilState(houseCategoryIdAtom);
  const [other, setOther] = useRecoilState(houseOtherInfoAtom);
  // const [address, setAddress] = useRecoilState(tempaddress);
  const [stat, setStat] = useRecoilState(statusAtom);
  const [preview, setPreview] = useRecoilState(previewAtom);
  const [fetchMyHouseData, setFetchMyHouseData] =
    useRecoilState(fetchMyHouseAtom);
  // const coordToAddress = useCoordToAddress();
  const [addresses, setAddresses] = useState<string[]>([]);
  // const [myHouseAddress, setMyHouseAddress] =
  //   useRecoilState(myHouseAddressAtom);

  const [address, setAddress] = useRecoilState(tempaddressAtom);

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

  const setEditPage = (house_id: number) => {
    const data = fetchMyHouseData.find((each, index) => {
      return each.id === house_id;
    });
    const data2 = fetchMyHouseData.findIndex((each) => {
      return each.id === house_id;
    });
    setAddress((current) => addresses[data2]);

    // coordToAddress(
    //   data?.location.latitude,
    //   data?.location.longitude,
    //   setAddress,
    // );

    setContact(data?.contact_number);
    setStat({ status: 0 });
    setUniv(1);
    setRegion(data?.region);
    setLat(data?.location.latitude as any);
    setLong(data?.location.longitude as any);
    setMonth(data?.cost.month_cost);
    setDepo(data?.cost.deposit);
    setCostother(data?.cost.other_info);
    setGen(data?.gender);
    setCat(data?.house_category);
    setOther(data?.house_other_info);

    //setAddress();
    // setImgFile({});
    // setPreview(data?.img_urls as any);
  };

  const [clickedHouse_id, setClickedHouse_id] =
    useRecoilState(clickedHouse_idAtom);
  const [isEditing, setIsEditing] = useRecoilState(isEditingAtom);
  const [deleteMyHouse, { loading: loading2, error: deleteMyHouseError }] =
    useMutation(DELETE_MYHOUSE, {
      onCompleted(data) {
        if (data.deleteMyHouse === 'success') {
          alert('게시물 삭제 완료');
          setIsDeleteModalOn((current) => !current);
          window.location.href = '/myhouse';
        } else if (data.deleteMyHouse === 'failed') {
          setIsDeleteModalOn((current) => !current);
          alert('게시물 삭제 실패');
        }
      },
      onError(error, clientOptions) {
        alert('게시물 삭제 실패');
      },
    });
  const {
    loading: fetchMyHouseLoading,
    error: fetchMyHouseError,
    data,
    refetch: refetchFetchMyHouse,
  } = useQuery(FETCH_MYHOUSE, {
    fetchPolicy: 'no-cache',
    onCompleted(data) {
      setFetchMyHouseData(data.fetchMyHouse);
    },
    onError(error) {
      console.log('액세스 토큰 만료됨', error.message);
    },
  });

  const navigate = useNavigate();
  const [isDeleteModalOn, setIsDeleteModalOn] = useState(false);

  const onClickYes_Delete = () => {
    deleteMyHouse({
      variables: {
        house_id: clickedHouse_id,
      },
    });
  };

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
      <YesNoModal
        innerText={'정말 삭제하시겠습니까?'}
        isModalOn={isDeleteModalOn}
        setIsModalOn={setIsDeleteModalOn}
        onClickYes={onClickYes_Delete}
      />
      <TitleWrapper2
        onClickBackButton={() => {
          navigate('/main');
        }}
      />
      <NoticeTextWrapper style={{ marginTop: '30px' }}>
        내가 올린 방 정보를 관리합니다.
      </NoticeTextWrapper>
      <p>게시물을 클릭하면 내가 올린 게시물을 직접 볼 수 있습니다.</p>
      {fetchMyHouseData[0]
        ? fetchMyHouseData?.map((each, index) => {
            const ad = addresses[index];
            return (
              <S.HouseWrapper
                key={index}
                onClick={() => {
                  navigate(`/house/${each.id}`);
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
                <S.HouseWrapper_ButtonsWrapper>
                  <EditButton
                    onClick={(event) => {
                      event.stopPropagation();
                      setClickedHouse_id(each.id as any);
                      setIsEditing((current) => true);
                      setEditPage(each.id);
                      setStat({ status: 0 });
                      navigate('/create');
                    }}
                  />
                  <DeleteButton
                    onClick={(event) => {
                      event.stopPropagation();
                      setClickedHouse_id(each.id as any);
                      setIsDeleteModalOn((current) => !current);
                    }}
                  />
                </S.HouseWrapper_ButtonsWrapper>
              </S.HouseWrapper>
            );
          })
        : null}
    </S.Container>
  );
}

export default MyHouse;
