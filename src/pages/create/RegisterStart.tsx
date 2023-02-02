import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import WhitePill from '../../components/molecules/WhitePill';
import * as S from './Registerstart.styled';
import { useRecoilState } from 'recoil';
import { isEditingAtom, status } from './atoms';

function RegisterStart() {
  const [isEditing, setIsEditing] = useRecoilState(isEditingAtom);
  const [stat, setStat] = useRecoilState(status);

  return (
    <S.Wrapper>
      <div id="textPlace">
        <NoticeTextWrapper>
          {isEditing
            ? '내가 올린 방 정보를 수정합니다.'
            : '방을 등록해 봅시다.'}
        </NoticeTextWrapper>
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
