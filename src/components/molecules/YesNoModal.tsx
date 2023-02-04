import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseButton } from '../../assets/CloseButton.svg';
import P_Manrope_Medium from '../atoms/P_Manrope_Medium';

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
  width: 300px;
  height: 160px;
  border-radius: 15px;
  position: fixed;
  z-index: 300;
  background-color: white;
  padding: 10px;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ModalWrapper_TextBox = styled.p`
  display: inline-block;
  position: relative;
  font-size: 20px;
  top: 70px;
  margin: 0;
`;
const ModalWrapper_YesNoWrapper = styled.div`
  width: 300px !important;
  height: 40px !important;
  display: flex;
  justify-content: space-between;
  position: relative;
  bottom: 15px;
  width: 100px;
  height: 10px;
`;
const ModalWrapper_YesNoWrapper_ButtonWrapper = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  top: 130px;
  right: 5px;
  p {
    text-align: center;
    vertical-align: center;
  }
`;

interface IModal {
  innerText: string;
  isModalOn: boolean;
  setIsModalOn: Dispatch<SetStateAction<boolean>>;
  onClickYes?: () => void;
  onClickNo?: () => void;
}

function Modal({
  innerText,
  isModalOn,
  setIsModalOn,
  onClickYes,
  onClickNo,
}: IModal) {
  return (
    <Wrapper isModalOn={isModalOn}>
      <ModalWrapper>
        <ModalWrapper_TextBox>{innerText}</ModalWrapper_TextBox>
        <ModalWrapper_YesNoWrapper>
          <ModalWrapper_YesNoWrapper_ButtonWrapper
            onClick={() => {
              if (onClickYes) {
                onClickYes();
              }
            }}
          >
            <P_Manrope_Medium>예</P_Manrope_Medium>
          </ModalWrapper_YesNoWrapper_ButtonWrapper>
          <ModalWrapper_YesNoWrapper_ButtonWrapper
            onClick={() => {
              if (onClickNo) {
                onClickNo();
              }
              setIsModalOn((current) => !current);
            }}
          >
            <P_Manrope_Medium>아니오</P_Manrope_Medium>
          </ModalWrapper_YesNoWrapper_ButtonWrapper>
        </ModalWrapper_YesNoWrapper>
      </ModalWrapper>
    </Wrapper>
  );
}

export default Modal;
