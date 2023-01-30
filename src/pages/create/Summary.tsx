import SummaryDataBar from '../../components/molecules/SummaryDataBar';
import WhitePill from '../../components/molecules/WhitePill';
import * as S from './Summary.styled';
import { useRecoilState, useRecoilValue } from 'recoil';
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
  tempfile,
  realfile,
} from './atoms';
import { gql, useMutation } from '@apollo/client';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
const univArray = ['고려대'];
const regionArray = ['성신여대', '안암역', '제기동', '고대정문'];
const genderArray = ['남성전용', '여성전용', '남녀 공용'];
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
  const contact = useRecoilValue(contactNumber);
  const univ = useRecoilValue(universityId);
  const region = useRecoilValue(regionId);
  const lat = useRecoilValue(latitude);
  const long = useRecoilValue(longitude);
  const month = useRecoilValue(monthCost);
  const depo = useRecoilValue(deposit);
  const costother = useRecoilValue(costOtherInfo);
  const gen = useRecoilValue(gender);
  const cat = useRecoilValue(houseCategoryId);
  const other = useRecoilValue(houseOtherInfo);
  const address = useRecoilValue(tempaddress);
  const [stat, setStat] = useRecoilState(status);
  const imgFile = useRecoilValue(realfile);
  const [createHouse, { data }] = useMutation(CREATE_HOUSE);

  return (
    <S.Wrapper>
      <NoticeTextWrapper>정보 입력이 완료되었습니다.</NoticeTextWrapper>
      <NoticeTextWrapper>
        정🐴 아래 정보와 같이 방 정보를 올리시겠습니까?
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
            imgFile,
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
              files: [imgFile[0]],
            },
          });
        }}
        text={'게시하기'}
      />
    </S.Wrapper>
  );
}
export default Summary;
