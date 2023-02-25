import styled from 'styled-components';
export const Container = styled.main`
  width: 100%;
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
  height: 260px;
  position: relative;
  overflow: hidden;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const ButtonsWrapper = styled.article`
  margin-top: 20px;
  display: flex;
  width: 80%;
  justify-content: space-evenly;
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
  box-shadow: 0px 3px 3px 0px gray;
`;

export const CarouselWrapper = styled.article`
  width: 100%;
  height: 300px;
  display: grid;
  grid-template-columns: calc(100% - 80px) 80px;
  grid-gap: 10px;
`;
