import TitleWrapper from '../../components/molecules/TitleWrapper';
import FilterWrapper from './FilterWrapper';
import * as S from './Houses.styled';
import HouseWrapper from './HouseWrapper';
import HouseWrapper_OnlyInfos from './HouseWrapper_OnlyInfos';

function Houses() {
  return (
    <S.Container>
      <TitleWrapper />
      <FilterWrapper />
      <HouseWrapper />
      <HouseWrapper_OnlyInfos />
      <HouseWrapper_OnlyInfos />
      <HouseWrapper_OnlyInfos />
    </S.Container>
  );
}

export default Houses;
