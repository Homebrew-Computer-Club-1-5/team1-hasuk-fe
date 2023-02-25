import * as S from './Calendar.styled';
import ReactCalendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import MonthlyAnnouncementsWrapper from './MonthlyAnnouncementsWrapper';

function Calendar() {
  //states
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  // hooks

  // useEffects

  // event handlers

  // etc

  return (
    <S.Container>
      <S.Main>
        {/* <ReactCalendar onChange={setCurrentDate} value={currentDate} /> */}
        <MonthlyAnnouncementsWrapper />
      </S.Main>
    </S.Container>
  );
}

export default Calendar;
