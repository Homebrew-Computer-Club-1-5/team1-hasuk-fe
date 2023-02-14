import { useNavigate } from 'react-router-dom';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import TitleWrapper2 from '../../components/molecules/TitleWrapper2';
import { ReactComponent as ForthButton } from '../../assets/ForthButton.svg';
import { ReactComponent as Help_ContactIcon } from '../../assets/Help_ContactIcon.svg';

import * as S from './Help.styled';

function Help() {
  //states

  // hooks
  const navigate = useNavigate();
  // useEffects

  // event handlers
  const onClickBackButton = () => {
    navigate('/mypage');
  };

  const onClickDifficulty = () => {};

  const onClickContact = () => {
    navigate('/help/article/1');
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
            무엇을 도와드릴까요?
          </NoticeTextWrapper>
        </S.Section>
        <S.Article>
          {/* <S.MenuWrapper>
            <S.MiddleTitleP>유저 문의</S.MiddleTitleP>
            <S.SelectWrapper
              style={{ cursor: 'pointer' }}
              onClick={onClickDifficulty}
            >
              <Help_DifficultyIcon
                style={{ position: 'relative', left: '6px' }}
              />
              <S.SelectP style={{ marginLeft: '30px' }}>
                이용 불편 신고
              </S.SelectP>
              <ForthButton
                fill="black"
                style={{ height: '20px', position: 'absolute', right: '0px' }}
              />
            </S.SelectWrapper>
          </S.MenuWrapper> */}
          <S.MenuWrapper>
            <S.MiddleTitleP>유저/비즈니스 문의</S.MiddleTitleP>
            <S.SelectWrapper
              style={{ cursor: 'pointer' }}
              onClick={onClickContact}
            >
              <Help_ContactIcon style={{ position: 'relative', left: '6px' }} />
              <S.SelectP style={{ marginLeft: '30px' }}>
                대학방 연락처
              </S.SelectP>
              <ForthButton
                fill="black"
                style={{ height: '20px', position: 'absolute', right: '0px' }}
              />
            </S.SelectWrapper>
          </S.MenuWrapper>
        </S.Article>
      </S.Main>
    </S.Container>
  );
}

export default Help;
