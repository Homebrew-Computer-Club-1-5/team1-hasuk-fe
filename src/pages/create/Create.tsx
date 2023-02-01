import styled from 'styled-components';
import TitleWrapper2 from '../../components/molecules/TitleWrapper2';
import RegisterStart from './RegisterStart';
import Tel from './Tel';
import Location from './Location';
import { useRecoilState } from 'recoil';
import { status } from './atoms';
import Price from './Price';
import Room from './Room';
import Photo from './Photo';
import SummaryDataBar from '../../components/molecules/SummaryDataBar';
import Summary from './Summary';
import { accessTokenAtom } from '../../store/atoms';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Wrapper = styled.div``;

function Create() {
  const [stat, setStat] = useRecoilState(status);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!accessToken) {
  //     alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
  //     navigate('/auth/login');
  //   }
  // }, []);

  return (
    <Wrapper>
      <Photo />
      <TitleWrapper2
        onClickBackButton={() => {
          const oldstat = stat.status;
          oldstat > 0 ? setStat({ status: oldstat - 1 }) : navigate('/main');
        }}
      />
      <div>
        {stat.status === 0 ? (
          <RegisterStart />
        ) : stat.status === 1 ? (
          <Location />
        ) : stat.status === 2 ? (
          <Tel />
        ) : stat.status === 3 ? (
          <Price />
        ) : stat.status === 4 ? (
          <Room />
        ) : stat.status === 5 ? (
          <Photo />
        ) : (
          <Summary />
        )}
      </div>
    </Wrapper>
  );
}

export default Create;
