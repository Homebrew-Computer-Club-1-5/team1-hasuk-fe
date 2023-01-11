import TitleWrapper from '../../components/molecules/TitleWrapper';
import FilterWrapper from './FilterWrapper';
import * as S from './Houses.styled';

function Houses() {
  return (
    <S.Container>
      <TitleWrapper />
      <FilterWrapper />
    </S.Container>
  );
}

export default Houses;
