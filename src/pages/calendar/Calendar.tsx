import * as S from './Calendar.styled';
import ReactCalendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import MonthlyAnnouncementsWrapper from './MonthlyAnnouncementsWrapper';
import NoticeTextWrapper from '../../components/molecules/NoticeTextWrapper';
import TitleWrapper2 from '../../components/molecules/TitleWrapper2';
import { useNavigate } from 'react-router-dom';

function Calendar() {
  //states
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  // hooks
  const navigate = useNavigate();

  // useEffects

  // event handlers
  const onClickBackButton = () => {
    navigate('/');
  };
  // etc

  return (
    <S.Container>
      <S.Header>
        <TitleWrapper2 onClickBackButton={onClickBackButton}></TitleWrapper2>
        <NoticeTextWrapper style={{ marginTop: '15px', marginBottom: '15px' }}>
          서울지역 기숙사 정보를 모아 놓았습니다.
        </NoticeTextWrapper>
      </S.Header>
      <S.Main>
        <MonthlyAnnouncementsWrapper />
      </S.Main>
    </S.Container>
  );
}

export default Calendar;
