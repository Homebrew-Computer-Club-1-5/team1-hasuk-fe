import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  position: fixed;
  height: 170px;
  width: 100vw;
  padding-top: 10px;
  background-color: white;
  top: 0;
  left: 0;
  z-index: 10000;
  box-shadow: 0px 5px 5px 0px #0000008f;
`;

export const Main = styled.main`
  margin-top: 190px;
`;

export const Wrapper = styled.div``;

export const NoticeP = styled.p`
  text-align: center;
  font-size: 15px;
`;

export const HouseNotExistsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60%;

  justify-content: center;

  font-weight: 800;
  font-size: 30px;
  p {
    margin: 10px 0px;
  }
`;
