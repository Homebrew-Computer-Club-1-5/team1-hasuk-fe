import styled from 'styled-components';
import Btndesign from '../../assets/Btndesign.png';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin-left: -10px;
`;

export const MapWrapper = styled.div`
  width: 100vw;
  position: relative;
  button {
    position: absolute;
    z-index: 6;
    min-width: 85px;
    margin: 10px 40vw 0px 40vw;
    font-size: 17px;
    font-weight: 600;
    border: none;
    padding-bottom: 5px;
    height: 35px;
    background-color: transparent;
    background-image: url(${Btndesign});
    background-size: cover;
  }
`;

export const Header = styled.header`
  width: 100vw;
  height: 40px;
  display: flex;
  align-items: center;
  position: relative;

  img {
    width: 45px;
    height: 45px;
    margin-left: 0px;
  }
  p {
    position: absolute;
    text-align: center;
    top: 40%;
    left: 50%;
    font-size: 27px;
    transform: translate(-50%, -50%);
  }
  h1 {
    font-size: 20px;
    margin-top: 10px;
  }
  div {
    margin: auto;
  }
`;

export const versionBox = styled.span`
  border: 1px solid grey;
  padding: 0px 5px;
  margin-left: 5px;
  margin-bottom: 1px;
  border-radius: 5px;
  height: 15px;
  background-color: black;
  font-weight: 660;
  color: white;
  font-size: 10px;
`;
