import styled from 'styled-components';
import Btndesign from '../../assets/Btndesign.png';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Wrapper = styled.div`
  width: 100vw;
  button {
    position: absolute;
    z-index: 6;
    margin: 10px 38%;
    font-size: 17px;
    font-weight: 600;
    border: none;
    padding-bottom: 5px;
    height: 35px;
    background-color: none;
    background-image: url(${Btndesign});
    background-size: cover;
  }
`;

export const Header = styled.header`
  width: 100vw;
  height: 40px;
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    margin-left: 10px;
  }
  span {
    font-size: 20px;
    font-weight: 990;
  }
  h1 {
    font-size: 20px;
    margin-top: 10px;
  }
`;

export const versionBox = styled.div`
  display: inline-block;
  border: 1px solid grey;
  padding: 0px 5px;
  margin-left: 5px;
  margin-right: 10vw;
  margin-top: 5px;
  border-radius: 5px;
  height: 15px;
  background-color: black;
  font-weight: 660;
  color: white;
  font-size: 10px;
`;
