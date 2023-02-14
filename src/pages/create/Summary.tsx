import SummaryDataBar from '../../components/molecules/SummaryDataBar';
import WhitePill from '../../components/molecules/WhitePill';
import * as S from './Summary.styled';
import { useRecoilState } from 'recoil';
import {
  statusAtom,
  contactNumberAtom,
  universityIdAtom,
  regionIdAtom,
  latitudeAtom,
  longitudeAtom,
  monthCostAtom,
  depositAtom,
  costOtherInfoAtom,
  genderAtom,
  houseCategoryIdAtom,
  houseOtherInfoAtom,
  tempaddressAtom,
  previewAtom,
  isEditingAtom,
  googleLinkAtom,
  innerpreviewAfterIdxDBAtom,
} from '../../store/atoms';
import { gql, useMutation } from '@apollo/client';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { clickedHouse_idAtom } from '../../store/atoms';
import useResetAllAtoms from '../../lib/util/resetAllAtoms';
import useRestoreAccessToken from '../../lib/util/tokenStrategy';
import Loading from '../../components/molecules/Loading';
import { CREATE_HOUSE, UPDATE_MY_HOUSE } from '../../lib/gql';
import useGetIdxedDBValue from '../../lib/util/getIdxedDBValue';

const univArray = ['고려대'];
const regionArray = [
  '성신여대',
  '보문동',
  '안암역',
  '제기동',
  '고대정문',
  '법대후문',
];
const genderArray = ['남성전용', '여성전용', '남녀 공용'];

const NoticeTextWrapperStyle = {
  paddingTop: '0px',
  marginTop: '0px',
  textAlign: 'center',
};

const categoryArray = ['일반', '하숙', '원룸/자취방', '고시원', '기타'];

function Summary() {
  const resetAllAtoms = useResetAllAtoms();
  const [clickedHouse_id, setClickedHouse_id] =
    useRecoilState(clickedHouse_idAtom);
  const [isEditing, setIsEditing] = useRecoilState(isEditingAtom);
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
  const [address, setAddress] = useRecoilState(tempaddressAtom);
  const [stat, setStat] = useRecoilState(statusAtom);
  const [preview, setPreview] = useRecoilState(previewAtom);
  const [googleLink, setGoogleLink] = useRecoilState(googleLinkAtom);
  const [innerpreviewAfterIdxDB, setInnerpreviewAfterIdxDB] = useRecoilState(
    innerpreviewAfterIdxDBAtom,
  );

  const navigate = useNavigate();
  const getIdxedDBValue = useGetIdxedDBValue();
  const fileObjListRef = useRef<File[]>([]);

  const restoreAccessToken = useRestoreAccessToken();
  const [createHouse, { data, loading: createHouseLoading, error }] =
    useMutation(CREATE_HOUSE, {
      onCompleted: (data) => {
        alert('게시물 등록이 완료되었습니다. 게시물 페이지로 이동합니다.');
        navigate(`/house/${data.createHouse}`);
      },
      onError(error, clientOptions) {
        console.log('에러가 발생했어요, 에러메세지 : ', error.message);
      },
    });

  const [
    updateMyHouse,
    { data: data2, loading: updateMyHouseLoading, error: error2 },
  ] = useMutation(UPDATE_MY_HOUSE, {
    onCompleted(data, clientOptions) {
      alert('게시물 업데이트가 완료되었습니다. 게시물 페이지로 이동합니다.');
      navigate(`/house/${data.updateMyHouse}`);
    },
    onError(error, clientOptions) {
      console.log('에러가 발생했어요, 에러메세지 : ', error.message);
    },
  });

  function executeCreateHouse() {
    createHouse({
      variables: {
        contact: contact,
        gender: parseInt(gen as any),
        other: other,
        lat: parseFloat(lat as any),
        long: parseFloat(long as any),
        month: parseInt(month as any),
        depo: parseInt(depo as any),
        costother: costother,
        region: parseInt(region as any),
        cat: parseInt(cat as any),
        files: fileObjListRef.current,
      },
    });
  }
  function executeUpdateMyHouse() {
    console.log(clickedHouse_id, '아이디');
    updateMyHouse({
      variables: {
        house_id: parseInt(clickedHouse_id as any),
        contact: contact,
        gender: parseInt(gen as any),
        other: other,
        lat: parseFloat(lat as any),
        long: parseFloat(long as any),
        month: parseInt(month as any),
        depo: parseInt(depo as any),
        costother: costother,
        region: parseInt(region as any),
        cat: parseInt(cat as any),
        files: fileObjListRef.current,
        googleLinks: googleLink,
      },
    });
  }

  async function getFileObjListFromPreview(urls: string[]) {
    const fileObjList = [];
    for (let index in urls) {
      const url = urls[index];
      const fileObj = await fetch(url)
        .then((r) => r.blob())
        .then((blobFile) => new File([blobFile], url, { type: blobFile.type }))
        .then((converted) => converted);
      fileObjList.push(fileObj);
    }
    return fileObjList;
  }

  // useEffects
  //// Index DB 읽어오기
  // 1. 컴포넌트 처음 렌더링시, indexDB 읽어오기 실행
  useEffect(() => {
    const result = getIdxedDBValue();
    return () => {
      setPreview((current) => []);
      setInnerpreviewAfterIdxDB((current) => []);
    };
  }, []);

  // 2. indexDB 읽어오기 완료될시, setPreview
  useEffect(() => {
    if (innerpreviewAfterIdxDB[0]) {
      setPreview((current) => innerpreviewAfterIdxDB);
    }
  }, [innerpreviewAfterIdxDB]);

  // 3. preview를 File[] 로 전환
  useEffect(() => {
    async function func() {
      const fileObjList = await getFileObjListFromPreview(preview);
      fileObjListRef.current = fileObjList;
    }
    func();
  }, [preview]);

  //// 에러핸들링
  useEffect(() => {
    if (error) {
      restoreAccessToken({
        onRestoreSuccess: () => {
          executeCreateHouse();
        },
      });
    }
  }, [error]);

  return (
    <S.Container>
      {createHouseLoading || updateMyHouseLoading ? (
        <Loading
          loadingText={
            createHouseLoading
              ? '게시물을 올리는 중입니다..'
              : '게시물을 업데이트 하는 중입니다..'
          }
        />
      ) : null}
      <S.Section>
        <NoticeTextWrapper style={NoticeTextWrapperStyle as any}>
          정말 아래 정보와 같이 <br />방 정보를 올리시겠습니까?
        </NoticeTextWrapper>
      </S.Section>
      <SummaryDataBar
        title={'연락처'}
        data={contact}
        onClickEvent={() => {
          setStat({ status: 2 });
        }}
      />
      <SummaryDataBar
        title={'대학'}
        data={univArray[Number(univ) - 1]}
        onClickEvent={() => {
          setStat({ status: 1 });
        }}
      />{' '}
      <SummaryDataBar
        title={'지역'}
        data={regionArray[Number(region) - 1]}
        onClickEvent={() => {
          setStat({ status: 1 });
        }}
      />{' '}
      <SummaryDataBar
        title={'주소'}
        data={address}
        onClickEvent={() => {
          setStat({ status: 1 });
        }}
      />{' '}
      <SummaryDataBar
        title={'월세'}
        data={[month, '만원']}
        onClickEvent={() => {
          setStat({ status: 3 });
        }}
      />{' '}
      <SummaryDataBar
        title={'보증금'}
        data={[depo, '만원']}
        onClickEvent={() => {
          setStat({ status: 3 });
        }}
      />{' '}
      <SummaryDataBar
        title={'공과금'}
        data={costother}
        onClickEvent={() => {
          setStat({ status: 3 });
        }}
      />{' '}
      <SummaryDataBar
        title={'성별'}
        data={genderArray[Number(gen) - 1]}
        onClickEvent={() => {
          setStat({ status: 4 });
        }}
      />
      <SummaryDataBar
        title={'카테고리'}
        data={categoryArray[Number(cat) - 1]}
        onClickEvent={() => {
          setStat({ status: 4 });
        }}
      />
      <SummaryDataBar
        title={'기타 정보'}
        data={other}
        onClickEvent={() => {
          setStat({ status: 4 });
        }}
      />
      <WhitePill
        onClick={() => {
          if (!isEditing) {
            executeCreateHouse();
          } else {
            executeUpdateMyHouse();
          }
        }}
        text={'게시하기'}
      />
    </S.Container>
  );
}
export default Summary;
