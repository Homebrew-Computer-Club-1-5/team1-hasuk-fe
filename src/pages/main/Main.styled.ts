import styled from 'styled-components';

export const Container = styled.div`
  margin-left: -10px;
  width: 95vw;
  height: 100vh;
`;

export const Wrapper = styled.div`
  width: 95vw;
  height: 95vh;
  position: relative;
  #map {
    width: 95vw !important;
    height: 100% !important;
  }
`;

export const Header = styled.header`
  width: 95vw;
  height: 40px;
  display: flex;
  align-items: center;
  img {
    width: 45px;
    height: 45px;
    margin-left: 0px;
  }
  p {
    font-size: 20px;
  }
  #selectBox {
    border: 1px solid black;
    margin-left: 35%;
    border-radius: 10px;
    img {
      position: absolute;
      width: 20px;
      height: 20px;
    }
    select {
      border: none;
      background-color: transparent;
      margin-left: 25px;
    }
  }
`;

export const versionBox = styled.div`
  display: inline-block;
  border: 1px solid grey;
  padding: 0px 5px;
  margin-left: 5px;
  margin-bottom: 2px;
  border-radius: 5px;
  height: 15px;
  background-color: black;
  font-weight: 660;
  color: white;
  font-size: 10px;
`;
