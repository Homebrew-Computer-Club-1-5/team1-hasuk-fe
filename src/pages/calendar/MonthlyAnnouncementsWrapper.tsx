import { dateObjToString } from '../../lib/util/time';
import * as S from './MonthlyAnnouncementsWrapper.styled';
import { ReactComponent as ForthButton } from '../../assets/ForthButton.svg';

// gql은 월을 fetch 했을때 들고와져야함.
const announcementDatas = [
  {
    postTitle: '안암 글로벌하우스 대학원생 남학생 1인실 잔여석 모집',
    postDate: new Date(2023, 1, 20),
    postLink: 'https://dorm.korea.ac.kr/front/board/1/post/1518?',
  },
  {
    postTitle:
      '2023학년도 프런티어관 신입생(정시) 기숙사 선발자 커트라인 및 향후 추가선발 계획 안내',
    postDate: new Date(2023, 1, 19),
    postLink: 'https://dorm.korea.ac.kr/front/board/1/post/1505?',
  },
  {
    postTitle:
      '[학생동/프런티어관] 2023학년도 정시합격생 기숙사 발표 일정 안내',
    postDate: new Date(2023, 1, 18),
    postLink: 'https://dorm.korea.ac.kr/front/board/1/post/1502?',
  },
  {
    postTitle: '[학생동] 2023학년도 1학기 입사안내문',
    postDate: new Date(2023, 1, 17),
    postLink: 'https://dorm.korea.ac.kr/front/board/1/post/1501?',
  },
  {
    postTitle:
      '2023-1학기 CJ 인터내셔널하우스 교원동 석,박사과정 및 연구교수 특별개사',
    postDate: new Date(2023, 1, 16),
    postLink: 'https://dorm.korea.ac.kr/front/board/1/post/1499?',
  },
];

function MonthlyAnnouncementsWrapper() {
  //states

  // hooks

  // useEffects

  // event handlers
  const onClickAnnouncementWrapper = (url: string) => {
    window.open(url);
  };

  // etc

  return (
    <S.Container>
      <S.Main>
        <S.Section>
          <p>월간 공지 모아보기</p>
        </S.Section>
        {announcementDatas.map((announcementData, index) => (
          <S.AnnouncementWrapper
            key={index}
            onClick={() =>
              onClickAnnouncementWrapper(announcementData.postLink)
            }
          >
            <S.DateP>{dateObjToString(announcementData.postDate)}</S.DateP>
            <S.postTitleP>{announcementData.postTitle}</S.postTitleP>
            <ForthButton fill="#bababa" />
          </S.AnnouncementWrapper>
        ))}
      </S.Main>
    </S.Container>
  );
}

export default MonthlyAnnouncementsWrapper;
