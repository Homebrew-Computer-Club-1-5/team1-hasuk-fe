import styled from 'styled-components';
import TitleWrapper2 from '../../components/molecules/TitleWrapper2';
import RegisterStart from './RegisterStart';
import Tel from './Tel';

const Wrapper = styled.div``;

function Create() {
  return (
    <Wrapper>
      <TitleWrapper2 onClickBackButton={() => console.log('1')} />
      <RegisterStart />
      <Tel />
    </Wrapper>
  );
}

export default Create;
