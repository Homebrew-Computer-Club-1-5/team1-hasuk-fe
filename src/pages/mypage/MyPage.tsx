import { useNavigate } from 'react-router-dom';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import TitleWrapper2 from '../../components/molecules/TitleWrapper2';
import * as S from './MyPage.styled';
import { ReactComponent as DefaultProfileImg } from '../../assets/DefaultProfileImg.svg';
import { ReactComponent as ForthButton } from '../../assets/ForthButton.svg';
import { ReactComponent as MyPage_HouseIcon } from '../../assets/MyPage_HouseIcon.svg';
import { ReactComponent as MyPage_UnivRoomIcon } from '../../assets/MyPage_UnivRoomIcon.svg';
import { ReactComponent as MyPage_ChatIcon } from '../../assets/MyPage_ChatIcon.svg';

import P_Manrope_ExtraBold from '../../components/atoms/P_Manrope_ExtraBold';

function MyPage() {
  //states

  // hooks
  const navigate = useNavigate();
  // useEffects

  // event handlers
  const onClickBackButton = () => {
    navigate('/');
  };
  const onClickMyHouse = () => {
    navigate('/myhouse');
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
            마이 페이지 입니다.
          </NoticeTextWrapper>
        </S.Section>
        <S.Article>
          <S.UserProfileWrapper>
            <DefaultProfileImg />
            <S.UserNameP>김건</S.UserNameP>
            <ForthButton
              fill="#BABABA"
              style={{ position: 'absolute', right: '20px' }}
            />
          </S.UserProfileWrapper>
          <S.MenuWrapper>
            <S.MiddleTitleP>계정 관리</S.MiddleTitleP>
            <S.SelectWrapper
              style={{ cursor: 'pointer' }}
              onClick={onClickMyHouse}
            >
              <MyPage_HouseIcon />
              <S.SelectP>내가 올린 방</S.SelectP>
              <ForthButton
                fill="black"
                style={{ height: '20px', position: 'absolute', right: '0px' }}
              />
            </S.SelectWrapper>
          </S.MenuWrapper>
          <S.MenuWrapper>
            <S.MiddleTitleP>대학방 지원</S.MiddleTitleP>
            <S.SelectWrapper style={{ cursor: 'pointer' }}>
              <MyPage_UnivRoomIcon />
              <S.SelectP>대학방 이용 방법</S.SelectP>
              <ForthButton
                fill="black"
                style={{ height: '20px', position: 'absolute', right: '0px' }}
              />
            </S.SelectWrapper>
            <S.SelectWrapper style={{ cursor: 'pointer' }}>
              <MyPage_ChatIcon style={{ position: 'relative', left: '6px' }} />
              <S.SelectP style={{ marginLeft: '20px' }}>
                고객센터 / 지원
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

export default MyPage;
