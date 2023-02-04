import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseButton } from '../../assets/CloseButton.svg';

interface IWrapper {
  isModalOn: boolean;
}

const Wrapper = styled.div<IWrapper>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isModalOn ? 'block' : 'none')};
`;

const ModalWrapper = styled.div`
  width: 80vw;
  height: 20vh;
  border-radius: 20px;
  position: fixed;
  z-index: 300;
  background-color: white;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ModalWrapper_TextBox = styled.p`
  padding: 40px;
  margin: 0 auto;
`;
interface IInfoModal {
  innerText: string;
  isModalOn: boolean;
  setIsModalOn: Dispatch<SetStateAction<boolean>>;
}

function InfoModal({ innerText, isModalOn, setIsModalOn }: IInfoModal) {
  return (
    <Wrapper isModalOn={isModalOn}>
      <ModalWrapper>
        <CloseButton
          style={{ width: '50px', position: 'absolute', top: '-10px' }}
          onClick={() => {
            setIsModalOn((current) => !current);
          }}
        />
        <ModalWrapper_TextBox>{innerText}</ModalWrapper_TextBox>
      </ModalWrapper>
    </Wrapper>
  );
}

export default InfoModal;
