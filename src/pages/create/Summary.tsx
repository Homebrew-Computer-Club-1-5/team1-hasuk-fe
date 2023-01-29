import SummaryDataBar from '../../components/molecules/SummaryDataBar';
import WhitePill from '../../components/molecules/WhitePill';
import * as S from './Summary.styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { status, information, tempaddress } from './atoms';
const univArray = ['고려대'];
const regionArray = ['성신여대', '안암역', '제기동', '고대정문'];
const genderArray = ['남성전용', '여성전용', '남녀 공용'];
const categoryArray = ['원룸/투룸/자취방', '하숙', '고시원', '기타'];

function Summary() {
  const all = useRecoilValue(information);
  const address = useRecoilValue(tempaddress);
  const [stat, setStat] = useRecoilState(status);
  console.log(all);
  return (
    <S.Wrapper>
      <SummaryDataBar
        title={'연락처'}
        data={all.contact_number}
        onClickEvent={() => {
          setStat({ status: 2 });
        }}
      />
      <SummaryDataBar
        title={'대학'}
        data={univArray[(all.university_id as number) - 1]}
        onClickEvent={() => {
          setStat({ status: 1 });
        }}
      />{' '}
      <SummaryDataBar
        title={'지역'}
        data={regionArray[(all.region_id as number) - 1]}
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
        data={[all.month_cost, '만원']}
        onClickEvent={() => {
          setStat({ status: 3 });
        }}
      />{' '}
      <SummaryDataBar
        title={'보증금'}
        data={[all.deposit, '만원']}
        onClickEvent={() => {
          setStat({ status: 3 });
        }}
      />{' '}
      <SummaryDataBar
        title={'공과금'}
        data={all.cost_other_info}
        onClickEvent={() => {
          setStat({ status: 3 });
        }}
      />{' '}
      <SummaryDataBar
        title={'성별'}
        data={genderArray[(all.gender as number) - 1]}
        onClickEvent={() => {
          setStat({ status: 4 });
        }}
      />
      <SummaryDataBar
        title={'카테고리'}
        data={categoryArray[(all.house_category_id as number) - 1]}
        onClickEvent={() => {
          setStat({ status: 4 });
        }}
      />
      <SummaryDataBar
        title={'기타 정보'}
        data={all.house_other_info}
        onClickEvent={() => {
          setStat({ status: 4 });
        }}
      />
    </S.Wrapper>
  );
}
export default Summary;
