import styled from 'styled-components';
import { ReactComponent as BackButton } from '../../assets/BackButton.svg';

import Title from '../atoms/Title';

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

function TitleWrapper() {
  return (
    <Wrapper>
      <BackButton
        style={{
          width: '36px', //
          position: 'absolute',
          left: 15,
        }}
      />
      <Title>고려대학교 - 제기동</Title>
    </Wrapper>
  );
}

export default TitleWrapper;
