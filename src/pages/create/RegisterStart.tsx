import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import WhitePill from '../../components/molecules/WhitePill';
import * as S from './Registerstart.styled';

function RegisterStart() {
  return (
    <S.Wrapper>
      <div id="textPlace">
        <NoticeTextWrapper>방을 등록해 봅시다</NoticeTextWrapper>
        <div id="buttonPlace">
          <WhitePill text={'시작'} onClickNavigator={() => null} />
        </div>
      </div>
    </S.Wrapper>
  );
}

export default RegisterStart;
