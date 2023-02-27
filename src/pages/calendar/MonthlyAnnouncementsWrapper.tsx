import { dateObjToString } from '../../lib/util/time';
import * as S from './MonthlyAnnouncementsWrapper.styled';
import { ReactComponent as ForthButton } from '../../assets/ForthButton.svg';

import { useEffect, useRef, useState } from 'react';
import Select from './Select';
import { useQuery } from '@apollo/client';
import { FETCH_CALENDAR } from '../../lib/gql';
import { sortAnnouncementDataByDate } from './util';

export interface IannouncementData {
  post_title: string;
  post_date: string;
  post_link: string;
  dormitory: {
    id: number;
    name: string;
    board_url: string;
  };
}

// const announcementDatas: IannouncementData[] = [
//   {
//     postTitle: '안암 글로벌하우스 대학원생 남학생 1인실 잔여석 모집',
//     postDate: new Date(2023, 1, 20),
//     postLink: 'https://dorm.korea.ac.kr/front/board/1/post/1518?',
//   },
//   {
//     postTitle:
//       '2023학년도 프런티어관 신입생(정시) 기숙사 선발자 커트라인 및 향후 추가선발 계획 안내',
//     postDate: new Date(2023, 1, 19),
//     postLink: 'https://dorm.korea.ac.kr/front/board/1/post/1505?',
//   },
//   {
//     postTitle:
//       '[학생동/프런티어관] 2023학년도 정시합격생 기숙사 발표 일정 안내',
//     postDate: new Date(2023, 1, 18),
//     postLink: 'https://dorm.korea.ac.kr/front/board/1/post/1502?',
//   },
//   {
//     postTitle: '[학생동] 2023학년도 1학기 입사안내문',
//     postDate: new Date(2023, 1, 17),
//     postLink: 'https://dorm.korea.ac.kr/front/board/1/post/1501?',
//   },
//   {
//     postTitle:
//       '2023-1학기 CJ 인터내셔널하우스 교원동 석,박사과정 및 연구교수 특별개사',
//     postDate: new Date(2023, 1, 16),
//     postLink: 'https://dorm.korea.ac.kr/front/board/1/post/1499?',
//   },
// ];

const dormitoryDatas = [
  {
    value: 1,
    label: '전체',
  },
  {
    value: 2,
    label: '고려대학교 안암학사',
  },
  {
    value: 3,
    label: '구미학숙',
  },
  {
    value: 4,
    label: '남명학사',
  },
];

const monthDatas = [
  {
    value: 1,
    label: '1월',
  },
  {
    value: 2,
    label: '2월',
  },
  {
    value: 3,
    label: '3월',
  },
  {
    value: 4,
    label: '4월',
  },
  {
    value: 5,
    label: '5월',
  },
  {
    value: 6,
    label: '6월',
  },
  {
    value: 7,
    label: '7월',
  },
  {
    value: 8,
    label: '8월',
  },
  {
    value: 9,
    label: '9월',
  },
  {
    value: 10,
    label: '10월',
  },
  {
    value: 11,
    label: '11월',
  },
  {
    value: 12,
    label: '12월',
  },
];

function MonthlyAnnouncementsWrapper() {
  // etc
  const currentMonthValue = new Date().getMonth() + 1;
  const currentMonthData = monthDatas.find(
    (monthData) => monthData.value === currentMonthValue,
  );

  //states
  const dormitoryState = useState(dormitoryDatas[0]);
  const [dormitoryData, setDormitoryData] = dormitoryState;
  const monthDataState = useState(currentMonthData);
  const [monthData, setMonthData] = monthDataState;

  const [announcementDatas, setAnnouncementDatas] = useState<
    IannouncementData[]
  >([]);
  // hooks
  const {
    loading,
    error,
    data,
    refetch: fetchCalendar,
  } = useQuery(FETCH_CALENDAR, {
    variables: {
      dormitory_id: parseFloat(dormitoryData.value as any),
      month: parseFloat(monthData?.value as any),
    },
    onCompleted: (data) => {
      setAnnouncementDatas((current) => data.fetchCalendar);
    },
  });
  // useEffects
  useEffect(() => {
    if (dormitoryData.value !== 1 && monthData?.value !== 1) {
      fetchCalendar();
    }
  }, [dormitoryData, monthData]);

  // event handlers
  const onClickAnnouncementWrapper = (url: string) => {
    window.open(url);
  };

  const onClickNavigateToBoard = (url: string) => {
    window.open(url);
  };

  const test: any = useRef();

  return (
    <S.Container>
      <S.Main>
        <S.Section>
          <S.DormitoryWrapper>
            <Select datas={dormitoryDatas} dataState={dormitoryState} />
            {announcementDatas[0] && dormitoryData.value !== 1 ? (
              <S.NavigateToBoard
                onClick={() =>
                  onClickNavigateToBoard(
                    announcementDatas[0].dormitory.board_url,
                  )
                }
              >
                <p>홈페이지 바로가기</p>
              </S.NavigateToBoard>
            ) : null}
          </S.DormitoryWrapper>
          <S.MonthWrapper>
            <Select datas={monthDatas} dataState={monthDataState} />
            <p>공지 모아보기</p>
          </S.MonthWrapper>
        </S.Section>
        {(announcementDatas as any)[0] && announcementDatas
          ? sortAnnouncementDataByDate(announcementDatas).map(
              (announcementData, index) => (
                <S.AnnouncementWrapper
                  key={index}
                  onClick={() =>
                    onClickAnnouncementWrapper(announcementData.post_link)
                  }
                >
                  <S.DateP>
                    {dateObjToString(new Date(announcementData.post_date))}
                  </S.DateP>
                  <S.postTitleP>{announcementData.post_title}</S.postTitleP>
                  <ForthButton fill="#bababa" />
                </S.AnnouncementWrapper>
              ),
            )
          : null}
      </S.Main>
    </S.Container>
  );
}

export default MonthlyAnnouncementsWrapper;
