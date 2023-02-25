import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Container = styled.div``;
const MessageBox = styled.div`
  background-color: gray;
  width: 90%;
  height: 50px;
  font-size: 20px;
  color: white;
  position: fixed;
  bottom: 70px;
  z-index: 10000;
  justify-content: center;
  display: flex;
  align-items: center;
`;

interface IDisapparingMessageBox {
  message: string;
}

function DisappearingMessageBox({ message }: IDisapparingMessageBox) {
  const [opacity, setOpacity] = useState(100);
  useEffect(() => {
    softRemover();
  }, [softRemover]);
  function softRemover() {
    if (opacity > 96) {
      setTimeout(() => {
        setOpacity((current) => current - 1);
      }, 100);
    } else if (opacity > 4) {
      setTimeout(() => {
        setOpacity((current) => current - 5);
      }, 50);
    }
  }
  return (
    <Container>
      {opacity > 0 ? (
        <MessageBox style={{ opacity: `${opacity}%` }}>{message}</MessageBox>
      ) : null}
    </Container>
  );
}

export default DisappearingMessageBox;
