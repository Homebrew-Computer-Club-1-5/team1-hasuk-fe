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
  realfile,
  previewAtom,
} from './atoms';
import { gql, useMutation } from '@apollo/client';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
const univArray = ['고려대'];
const regionArray = ['성신여대', '안암역', '제기동', '고대정문'];
const genderArray = ['남성전용', '여성전용', '남녀 공용'];
const NoticeTextWrapperStyle = {
  paddingTop: '0px',
  marginTop: '0px',
  textAlign: 'center',
};

const categoryArray = ['원룸/투룸/자취방', '하숙', '고시원', '기타'];
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

function Summary() {
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

  const navigate = useNavigate();

  const [createHouse, { data, loading, error }] = useMutation(CREATE_HOUSE, {
    onCompleted: (data) => {
      console.log(data.createHouse);
      alert('게시물 등록이 완료되었습니다. 게시물 페이지로 이동합니다.');
      resetAllAtoms();
      navigate(`/house/${data.createHouse}`);
    },
    onError(error, clientOptions) {
      console.log('에러가 발생했어요, 에러메세지 : ', error.message);
    },
  });

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

  function resetAllAtoms() {
    setContact('');
    setStat({ status: 0 });
    setUniv(0);
    setRegion(0);
    setLat(0);
    setLong(0);
    setMonth(0);
    setDepo(0);
    setCostother('');
    setGen(0);
    setCat(0);
    setOther('');
    setAddress('');
    setImgFile({});
    setPreview([]);
    localStorage.removeItem('recoil-persist');
  }

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

  useEffect(() => {
    if (error) {
      axios
        .get(`/auth/restore-access-token`, {
          withCredentials: true,
        })
        .then((res) => {
          localStorage.removeItem('accessToken');
          localStorage.setItem('accessToken', res.data);
          const newAccessToken = localStorage.getItem('accessToken');
          console.log('새 accessToken 갱신완료 : ', newAccessToken);
          executeCreateHouse();
        })
        .catch((err) => {
          console.log('에러메세지 : ', err.message);
          resetAllAtoms();
          localStorage.removeItem('accessToken');
          alert('로그인 세션이 만료되였습니다. 로그인 페이지로 이동합니다.');
          navigate('/auth/login');
        });
    }
  }, [error]);

  return (
    <S.Wrapper>
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
        onClickNavigator={() => {
          console.log(
            contact,
            gen,
            other,
            lat,
            long,
            month,
            depo,
            costother,
            region,
            cat,
            URLarray,
          );
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
              files: imgFile,
            },
          });
        }}
        text={'게시하기'}
      />
    </S.Wrapper>
  );
}
export default Summary;
