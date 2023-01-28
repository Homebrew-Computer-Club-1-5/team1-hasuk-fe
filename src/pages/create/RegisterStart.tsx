import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import WhitePill from '../../components/molecules/WhitePill';
import * as S from './Registerstart.styled';
import { useRecoilState } from 'recoil';
import { status } from './atoms';

function RegisterStart() {
  const [stat, setStat] = useRecoilState(status);

  console.log(stat);
  return (
    <S.Wrapper>
      <div id="textPlace">
        <NoticeTextWrapper>방을 등록해 봅시다</NoticeTextWrapper>
        <div id="buttonPlace">
          <WhitePill
            text={'시작'}
            onClickNavigator={() => {
              setStat({ status: 1 } as any);
            }}
          />
        </div>
      </div>
    </S.Wrapper>
  );
}

export default RegisterStart;
