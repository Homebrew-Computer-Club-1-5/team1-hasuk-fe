import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseButton } from '../../assets/CloseButton.svg';

interface IWrapper {
  isModalOn: boolean;
}

const Wrapper = styled.div<IWrapper>`
  width: 100%;
  height: 100%;
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
  width: 100%;
  height: 100%;
  padding: 40px;
  margin: 0 auto;
`;
interface IModal {
  innerText: string;
  isModalOn: boolean;
  setIsModalOn: Dispatch<SetStateAction<boolean>>;
}

function Modal({ innerText, isModalOn, setIsModalOn }: IModal) {
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

export default Modal;
