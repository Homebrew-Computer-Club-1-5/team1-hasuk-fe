import styled from 'styled-components';
import TitleWrapper2 from '../../components/molecules/TitleWrapper2';
import RegisterStart from './RegisterStart';
import Tel from './Tel';
import Location from './Location';
import { useRecoilState } from 'recoil';
import { status } from './atoms';
const Wrapper = styled.div``;

function Create() {
  const [stat, setStat] = useRecoilState(status);
  return (
    <Wrapper>
      <TitleWrapper2
        onClickBackButton={() => {
          const oldstat = stat.status;
          setStat(oldstat > 0 ? { status: oldstat - 1 } : { status: 0 });
          console.log(stat);
        }}
      />
      <div>
        {stat.status === 0 ? (
          <RegisterStart />
        ) : stat.status === 1 ? (
          <Tel />
        ) : stat.status === 2 ? (
          <Location />
        ) : null}
      </div>
    </Wrapper>
  );
}

export default Create;
