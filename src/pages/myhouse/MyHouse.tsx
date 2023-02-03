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
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { clickedHouse_idAtom, fetchMyHouseAtom } from '../../store/atoms';
import {
  contactNumber,
  costOtherInfo,
  deposit,
  gender,
  houseCategoryId,
  houseOtherInfo,
  isEditingAtom,
  latitude,
  longitude,
  monthCost,
  previewAtom,
  realfile,
  regionId,
  status,
  tempaddress,
  universityId,
} from '../create/atoms';
import useResetAllAtoms from '../../lib/util/resetAllAtoms';

const FETCH_MYHOUSE = gql`
  query {
    fetchMyHouse {
      id
      img_urls
      contact_number
      gender
      house_other_info
      region
      cost {
        month_cost
        deposit
        other_info
      }
      house_category
      location {
        longitude
        latitude
      }
      board_date
    }
  }
`;

const DELETE_MYHOUSE = gql`
  mutation ($house_id: Float!) {
    deleteMyHouse(house_id: $house_id)
  }
`;

function MyHouse() {
  const resetAllAtoms = useResetAllAtoms();
  useEffect(() => {
    resetAllAtoms();
  }, []);
  const [contact, setContact] = useRecoilState(contactNumber);
  const [univ, setUniv] = useRecoilState(universityId);
  const [region, setRegion] = useRecoilState(regionId);
  const [lat, setLat] = useRecoilState(latitude);
  const [long, setLong] = useRecoilState(longitude);
  const [month, setMonth] = useRecoilState(monthCost);
  const [depo, setDepo] = useRecoilState(deposit);
  const [costother, setCostother] = useRecoilState(costOtherInfo);
  const [gen, setGen] = useRecoilState(gender);
  const [cat, setCat] = useRecoilState(houseCategoryId);
  const [other, setOther] = useRecoilState(houseOtherInfo);
  const [address, setAddress] = useRecoilState(tempaddress);
  const [stat, setStat] = useRecoilState(status);
  const [imgFile, setImgFile] = useRecoilState(realfile);
  const [preview, setPreview] = useRecoilState(previewAtom);
  const [fetchMyHouseData, setFetchMyHouseData] =
    useRecoilState(fetchMyHouseAtom);
  const setEditPage = (house_id: number) => {
    const data = fetchMyHouseData.find((each) => each.id === house_id);
    setContact(data?.contact_number);
    setStat({ status: 0 });
    setUniv(0); //
    setRegion(data?.region);
    setLat(data?.location.latitude as any);
    setLong(data?.location.longitude as any);
    setMonth(data?.cost.month_cost);
    setDepo(data?.cost.deposit);
    setCostother(data?.cost.other_info);
    setGen(data?.gender);
    setCat(data?.house_category);
    setOther(data?.house_other_info);
    // setAddress('주소');
    // setImgFile({});
    // setPreview([]);
  };

  const [clickedHouse_id, setClickedHouse_id] =
    useRecoilState(clickedHouse_idAtom);
  const [isEditing, setIsEditing] = useRecoilState(isEditingAtom);
  const [deleteMyHouse, { loading: loading2 }] = useMutation(DELETE_MYHOUSE, {
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
      console.log(error.message);
    },
  });

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

  const onClickYes_Delete = () => {
    console.log(clickedHouse_id);
    deleteMyHouse({
      variables: {
        house_id: clickedHouse_id,
      },
    });
  };

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
              <P_Manrope_Medium>올린 날짜 : {each.board_date}</P_Manrope_Medium>
            </S.HouseWrapper_InfosWrapper>
            <S.HouseWrapper_ButtonsWrapper>
              <EditButton
                onClick={() => {
                  setClickedHouse_id(each.id as any);
                  setIsEditing((current) => true);
                  setEditPage(each.id);
                  navigate('/create');
                }}
              />
              <DeleteButton
                onClick={() => {
                  setClickedHouse_id(each.id as any);
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
