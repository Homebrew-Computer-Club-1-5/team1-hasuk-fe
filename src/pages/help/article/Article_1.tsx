import { useNavigate } from 'react-router-dom';
import NoticeTextWrapper from '../../../components/molecules/NoticeTextWrapper';
import TitleWrapper2 from '../../../components/molecules/TitleWrapper2';
import * as S from './Article_1.styled';
import kakaotalkIcon from '../../../assets/kakaotalkIcon.png';
import { ReactComponent as Article_1_EmailIcon } from '../../../assets/Article_1_EmailIcon.svg';

function Article_1() {
  //states

  // hooks
  const navigate = useNavigate();

  // useEffects

  // event handlers
  const onClickBackButton = () => {
    navigate('/help');
  };
  // etc

  return (
    <S.Container>
      <S.Header>
        <TitleWrapper2 onClickBackButton={onClickBackButton} />
      </S.Header>
      <S.Main>
        <S.Section>
          <NoticeTextWrapper fontSize="30px" style={{ marginTop: '10px' }}>
            대학방 연락처 입니다.
          </NoticeTextWrapper>
        </S.Section>
        <S.Article>
          <S.ContactWrapper>
            <S.ContactTitleWrapper>
              <img src={kakaotalkIcon} />
              <S.ContactTitleP>오픈 카카오톡 채널</S.ContactTitleP>
            </S.ContactTitleWrapper>
            <S.ContactInfoP>id : @univroom</S.ContactInfoP>
            <S.ContactInfoP>
              <a href="http://pf.kakao.com/_xknANxj">
                link : http://pf.kakao.com/_xknANxj
              </a>
            </S.ContactInfoP>
          </S.ContactWrapper>
          <S.GrayLine />
          <S.ContactWrapper>
            <S.ContactTitleWrapper>
              <Article_1_EmailIcon style={{ width: '65px', height: '65px' }} />
              <S.ContactTitleP>이메일</S.ContactTitleP>
            </S.ContactTitleWrapper>
            <S.ContactInfoP>email : gunpoll823@gmail.com</S.ContactInfoP>
          </S.ContactWrapper>
        </S.Article>
      </S.Main>
    </S.Container>
  );
}

export default Article_1;
