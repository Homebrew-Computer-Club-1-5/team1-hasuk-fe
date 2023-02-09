import ImgCarousel from '../../components/molecules/ImgCarousel';
import P_Manrope_Bold from '../../components/atoms/P_Manrope_Bold';
import P_Manrope_Light from '../../components/atoms/P_Manrope_Light';
import P_Manrope_ExtraBold from '../../components/atoms/P_Manrope_ExtraBold';
import P_Manrope_Regular from '../../components/atoms/P_Manrope_Regular';
import * as S from './HouseWrapper.styled';
import { convertTimestamp } from '../../lib/util/time';
import { useNavigate } from 'react-router-dom';
import { IhouseData_fetchAllHouses } from '../../store/atoms';

interface IHouseWrapper {
  houseData: IhouseData_fetchAllHouses;
}

function HouseWrapper({ houseData }: IHouseWrapper) {
  const navigate = useNavigate();

  const img_urls = houseData.imgs.map((imgObj: any) => imgObj.img_url);
  const category = houseData.house_category?.id;
  const board_date = houseData.board_date;

  const currentTime = Date.now();
  const { days, hours, minutes, totalSeconds } = convertTimestamp(
    currentTime - board_date,
  );

  return (
    <S.Container
      onClick={() => {
        navigate(`/house/${houseData.id}`);
      }}
    >
      <ImgCarousel img_url={img_urls ? img_urls : []}></ImgCarousel>
      <S.InfosWrapper>
        <S.ExtraInfosWrapper>
          <P_Manrope_Bold>
            {category === 1
              ? '일반'
              : category === 2
              ? '하숙'
              : category === 3
              ? '자취방/원룸'
              : category === 4
              ? '고시원'
              : '기타'}
          </P_Manrope_Bold>
          <P_Manrope_Light>
            {houseData.region?.name
              ? `${houseData.region?.name} 지역`
              : '지역정보 없음'}
          </P_Manrope_Light>
          <P_Manrope_Light>
            {days !== 0
              ? `${days}일 `
              : days === 0 && hours !== 0
              ? `${hours}시간 `
              : days === 0 && hours === 0 && minutes !== 0
              ? `${minutes}분 `
              : `${totalSeconds}초 `}
            전 업데이트
          </P_Manrope_Light>
        </S.ExtraInfosWrapper>
        <S.PriceInfoWrapper>
          <P_Manrope_ExtraBold style={{ fontSize: '35px' }}>
            {houseData.house_cost?.month_cost}
          </P_Manrope_ExtraBold>
          <P_Manrope_Regular>
            {houseData.house_cost?.month_cost
              ? '만 /월'
              : '금액 정보 전화 문의'}
          </P_Manrope_Regular>
        </S.PriceInfoWrapper>
      </S.InfosWrapper>
    </S.Container>
  );
}

export default HouseWrapper;
