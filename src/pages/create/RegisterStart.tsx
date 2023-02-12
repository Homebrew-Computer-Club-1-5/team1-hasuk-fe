import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import WhitePill from '../../components/molecules/WhitePill';
import * as S from './Registerstart.styled';
import { useRecoilState } from 'recoil';
import { isEditingAtom, statusAtom } from '../../store/atoms';

function RegisterStart() {
  const [isEditing, setIsEditing] = useRecoilState(isEditingAtom);
  const [stat, setStat] = useRecoilState(statusAtom);

  return (
    <S.Container>
      <NoticeTextWrapper>
        {isEditing ? '내가 올린 방 정보를 수정합니다.' : '방을 등록해 봅시다.'}
      </NoticeTextWrapper>
      <WhitePill
        text={'시작'}
        onClick={() => {
          setStat({ status: 1 } as any);
        }}
      />
    </S.Container>
  );
}

export default RegisterStart;
