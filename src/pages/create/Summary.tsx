import SummaryDataBar from '../../components/molecules/SummaryDataBar';
import WhitePill from '../../components/molecules/WhitePill';
import * as S from './Summary.styled';
import { useRecoilState } from 'recoil';
import {
  status,
  contactNumber,
  universityId,
  regionId,
  latitude,
  longitude,
  monthCost,
  deposit,
  costOtherInfo,
  gender,
  houseCategoryId,
  houseOtherInfo,
  tempaddress,
  previewAtom,
  isEditingAtom,
} from './atoms';
import { gql, useMutation } from '@apollo/client';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { clickedHouse_idAtom } from '../../store/atoms';
import useResetAllAtoms from '../../lib/util/resetAllAtoms';
import useRestoreAccessToken from '../../lib/util/tokenStrategy';
import Loading from '../../components/molecules/Loading';

function clearIdxedDBValue() {
  const request = window.indexedDB.open('linksDB', 2); // 1. db 열기
  request.onerror = (e: any) => console.log(e.target.errorCode);

  request.onsuccess = (e) => {
    const db = request.result;
    const transaction = db.transaction(['links'], 'readwrite');
    transaction.onerror = (e) => console.log('fail');
    transaction.oncomplete = (e) => console.log('success');

    const objStore = transaction.objectStore('links'); // 2. name 저장소 접근
    const objStoreRequest = objStore.clear(); // 3. 전체 삭제
    objStoreRequest.onsuccess = (e) => {
      // console.log('cleared');
    };
  };
}

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
const categoryArray = ['하숙', '원룸/자취방', '고시원', '기타'];
const CREATE_HOUSE = gql`
  mutation (
    $contact: String
    $gender: Int
    $other: String
    $lat: Float!
    $long: Float!
    $month: Int!
    $depo: Int
    $costother: String
    $region: Int!
    $cat: Int!
    $files: [Upload!]
  ) {
    createHouse(
      createHouseInput: {
        house: {
          contact_number: $contact
          gender: $gender
          house_other_info: $other
        }
        house_location: { latitude: $lat, longitude: $long }
        house_cost: {
          month_cost: $month
          deposit: $depo
          other_info: $costother
        }
        region_id: $region
        house_category_id: $cat
        imgRawDatas: $files
      }
    )
  }
`;

const UPDATE_MY_HOUSE = gql`
  mutation (
    $house_id: Int!
    $contact: String
    $gender: Int
    $other: String
    $lat: Float!
    $long: Float!
    $month: Int!
    $depo: Int
    $costother: String
    $region: Int!
    $cat: Int!
    $files: [Upload!]
  ) {
    updateMyHouse(
      updateMyHouseInput: {
        house_id: $house_id
        house: {
          contact_number: $contact
          gender: $gender
          house_other_info: $other
        }
        house_location: { latitude: $lat, longitude: $long }
        house_cost: {
          month_cost: $month
          deposit: $depo
          other_info: $costother
        }
        region_id: $region
        house_category_id: $cat
        imgRawDatas: $files
      }
    )
  }
`;

function Summary() {
  async function getIdxedDBValue() {
    const request = indexedDB.open('linksDB', 2);
    let db;
    request.onerror = (e) => alert('failed');
    const result = await new Promise((resolve, reject) => {
      const result1: any = [];
      request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction(['links'], 'readwrite');
        transaction.oncomplete = (e) => {
          // console.log('transaction success');
        };
        transaction.onerror = (e) => {
          // console.log('transaction fail');
        };
        const objStore = transaction.objectStore('links');
        const cursorRequest = objStore.openCursor();
        cursorRequest.onsuccess = (e: any) => {
          let cursor = e.target.result;
          if (cursor) {
            const value = objStore.get(cursor.key);
            value.onsuccess = (e: any) => {
              result1.push(e.target.result);
            };
          }
          cursor.continue();
        };
      };
      resolve(result1);
    });

    request.onupgradeneeded = (e: any) => {
      db = e.target.result;
      db.createObjectStore('links', { autoIncrement: true });
    };
    return result;
  }
  const resetAllAtoms = useResetAllAtoms();
  const [clickedHouse_id, setClickedHouse_id] =
    useRecoilState(clickedHouse_idAtom);
  const [isEditing, setIsEditing] = useRecoilState(isEditingAtom);
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
  const [preview, setPreview] = useRecoilState(previewAtom);

  const navigate = useNavigate();
  const restoreAccessToken = useRestoreAccessToken();
  const [
    createHouse,
    { data, loading: createHouseLoading, error: createHouseError },
  ] = useMutation(CREATE_HOUSE, {
    onCompleted: (data) => {
      alert('게시물 등록이 완료되었습니다. 게시물 페이지로 이동합니다.');
      clearIdxedDBValue();
      navigate(`/house/${data.createHouse}`);
    },
    onError(error, clientOptions) {
      console.log('액세스 토큰 만료 : ', error.message);
    },
  });

  const [
    updateMyHouse,
    { data: data2, loading: updateMyHouseLoading, error: updateHouseError },
  ] = useMutation(UPDATE_MY_HOUSE, {
    onCompleted(data, clientOptions) {
      alert('게시물 업데이트가 완료되었습니다. 게시물 페이지로 이동합니다.');
      clearIdxedDBValue();
      navigate(`/house/${data.updateMyHouse}`);
    },
    onError(error, clientOptions) {
      console.log('액세스 토큰 만료 : ', error.message);
    },
  });

  useEffect(() => {
    if (createHouseError) {
      restoreAccessToken({
        onRestoreSuccess: () => {
          executeCreateHouse();
        },
      });
    } else if (updateHouseError) {
      restoreAccessToken({
        onRestoreSuccess: () => {
          executeUpdateMyHouse();
        },
      });
    }
  }, [createHouseError, updateHouseError]);
  var URLarray: any = [];

  async function getFile(url: string) {
    const file = await fetch(url)
      .then((r) => r.blob())
      .then((blobFile) => new File([blobFile], url, { type: blobFile.type }))
      .then((converted) => (URLarray = [...URLarray, converted]));
    return file;
  }
  preview.map((url) => {
    getFile(url);
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
        files: URLarray,
      },
    });
  }
  function executeUpdateMyHouse() {
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
        files: URLarray,
      },
    });
  }

  return (
    <S.Wrapper>
      {createHouseLoading || updateMyHouseLoading ? (
        <Loading
          loadingText={
            createHouseLoading
              ? '게시물을 올리는 중입니다..'
              : '게시물을 업데이트 하는 중입니다..'
          }
        />
      ) : null}
      <NoticeTextWrapper style={NoticeTextWrapperStyle as any}>
        정말 아래 정보와 같이 <br />방 정보를 올리시겠습니까?
      </NoticeTextWrapper>
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
        data={genderArray[Number(gen)]}
        onClickEvent={() => {
          setStat({ status: 4 });
        }}
      />
      <SummaryDataBar
        title={'카테고리'}
        data={categoryArray[Number(cat) - 2]}
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
        onClickNavigator={() => {
          if (!isEditing) {
            executeCreateHouse();
          } else {
            executeUpdateMyHouse();
          }
        }}
        text={'게시하기'}
      />
    </S.Wrapper>
  );
}
export default Summary;
