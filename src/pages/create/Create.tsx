import TitleWrapper2 from '../../components/molecules/TitleWrapper2';
import RegisterStart from './RegisterStart';
import Tel from './Tel';
import Location from './Location';
import { useRecoilState } from 'recoil';
import { statusAtom } from '../../store/atoms';
import Price from './Price';
import Room from './Room';
import Photo from './Photo';
import Summary from './Summary';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as S from './Create.styled';

function Create() {
  const [stat, setStat] = useRecoilState(statusAtom);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (!accessToken) {
      navigate('/auth/login');
    }
  }, []);
  return (
    <S.Container>
      <S.Header>
        <TitleWrapper2
          onClickBackButton={() => {
            const oldstat = stat.status;
            oldstat > 0 ? setStat({ status: oldstat - 1 }) : navigate('/');
          }}
        />
      </S.Header>
      <S.Main>
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
      </S.Main>
    </S.Container>
  );
}

export default Create;
