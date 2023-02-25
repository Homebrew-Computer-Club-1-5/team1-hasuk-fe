import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HouseWrapper = styled.div`
  box-sizing: border-box;
  width: 95vw;
  height: 150px;
  background-color: #efefef;
  border-radius: 15px;
  margin: 10px 0px;
  display: flex;
  padding: 15px;
  position: relative;
`;

export const HouseWrapper_Img = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 10px;
`;

export const HouseWrapper_InfosWrapper = styled.div`
  margin-left: 10px;
  p {
    font-size: 13.5px;
  }
`;

export const HouseWrapper_ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  top: 15px;
`;
