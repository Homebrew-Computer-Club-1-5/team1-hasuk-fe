import TitleWrapper from '../../components/molecules/TitleWrapper';
import FilterWrapper from './FilterWrapper';
import * as S from './Houses.styled';
import HouseWrapper from './HouseWrapper';

function Houses() {
  return (
    <S.Container>
      <TitleWrapper />
      <FilterWrapper />
      <HouseWrapper />
    </S.Container>
  );
}

export default Houses;
