import styled from 'styled-components';
export const Wrapper = styled.div`
  width: 80vw;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NumberH1 = styled.h1``;

export const EmptyImage = styled.div`
  background: lightgray;
  border-radius: 12px;
  width: 100%;
  height: 30vh;
  position: relative;
  overflow: hidden;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const ButtonsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
`;

export const UploadLabel = styled.label`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  z-index: 6;
  min-width: 85px;
  font-size: 17px;
  font-weight: 600;
  border: 1px solid black;

  background-color: white;
  border-radius: 20px;
  text-align: center;
`;
