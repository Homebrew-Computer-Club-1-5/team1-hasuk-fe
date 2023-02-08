import styled from 'styled-components';
import Btndesign from '../../assets/Btndesign.png';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin-left: -10px;
`;

export const mapWrapper_focused = styled.div`
  width: 100vw;
  height: 95vh;
  position: relative;
  .legend {
    position: absolute;
    z-index: 99;
    top: 90px;
    background-color: transparent;
    left: 10px;
    display: flex;
    flex-direction: column;
    align-items: left;
    div {
      display: flex;
      img {
        width: 20px;
        height: 20px;
      }
      p {
        text-align: center;
        font-weight: 990;
        font-size: 10px;
        font-family: 'Manrope';
        transform: translate(0px, -5px);
      }
    }
  }
`;

export const MapWrapper = styled.div`
  width: 100vw;
  position: relative;
  button {
    position: absolute;
    margin: 10px 40%;
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
