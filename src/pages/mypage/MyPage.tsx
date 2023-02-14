import { useNavigate } from 'react-router-dom';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import TitleWrapper2 from '../../components/molecules/TitleWrapper2';
import * as S from './MyPage.styled';
import { ReactComponent as DefaultProfileImg } from '../../assets/DefaultProfileImg.svg';
import { ReactComponent as ForthButton } from '../../assets/ForthButton.svg';
import { ReactComponent as MyPage_HouseIcon } from '../../assets/MyPage_HouseIcon.svg';
import { ReactComponent as MyPage_UnivRoomIcon } from '../../assets/MyPage_UnivRoomIcon.svg';
import { ReactComponent as MyPage_ChatIcon } from '../../assets/MyPage_ChatIcon.svg';
import { useQuery as useReactQuery } from 'react-query';
import { IloggedInUserInfo, loggedInUserInfoAtom } from '../../store/atoms';
import { userCheck } from '../../lib/util/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { isEmptyObject } from '../../lib/util/javascript';
import useRestoreAccessToken from '../../lib/util/tokenStrategy';

function MyPage() {
  const accessToken = localStorage.getItem('accessToken');

  //states
  const [loggedInUserInfo, setLoggedInUserInfo] =
    useRecoilState(loggedInUserInfoAtom);

  // hooks
  const navigate = useNavigate();
  const restoreAccessToken = useRestoreAccessToken();
  const {
    isLoading: userCheckLoading,
    data: userCheckData,
    refetch: userCheckRefetch,
  } = useReactQuery<IloggedInUserInfo>('loggedInUserInfo', userCheck as any, {
    onSuccess(data) {
      setLoggedInUserInfo(data);
    },
    onError(err) {
      console.log('에러가 발생했어요 : ', (err as any).message);
      if ((err as any).message.includes('401')) {
        restoreAccessToken({ onRestoreSuccess: userCheckRefetch });
      }
    },
    enabled: isEmptyObject(loggedInUserInfo) && !!accessToken, // 로그인은 되어있는데 유저정보가 없는 경우
    retry: 0,
  });

  // event handlers
  const onClickBackButton = () => {
    navigate('/');
  };
  const onClickMyHouse = () => {
    navigate('/mypage/myhouse');
  };
  const onClickUserProfileWrapper = () => {
    if (isEmptyObject(loggedInUserInfo)) navigate('/auth/login');
  };

  const onClickChatIcon = () => {
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
            마이 페이지 입니다.
          </NoticeTextWrapper>
        </S.Section>
        <S.Article>
          <S.UserProfileWrapper onClick={onClickUserProfileWrapper}>
            <DefaultProfileImg />
            <S.UserNameP>
              {!isEmptyObject(loggedInUserInfo)
                ? loggedInUserInfo.name
                : '로그인이 필요합니다.'}
            </S.UserNameP>
            <ForthButton
              fill="#BABABA"
              style={{ position: 'absolute', right: '20px' }}
            />
          </S.UserProfileWrapper>
          {!isEmptyObject(loggedInUserInfo) ? (
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
          ) : null}

          <S.MenuWrapper>
            <S.MiddleTitleP>대학방 지원</S.MiddleTitleP>
            {/* <S.SelectWrapper style={{ cursor: 'pointer' }}>
              <MyPage_UnivRoomIcon />
              <S.SelectP>대학방 이용 방법</S.SelectP>
              <ForthButton
                fill="black"
                style={{ height: '20px', position: 'absolute', right: '0px' }}
              />
            </S.SelectWrapper> */}
            <S.SelectWrapper
              style={{ cursor: 'pointer' }}
              onClick={onClickChatIcon}
            >
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
