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
    margin-right: 20vw;
  }
  span {
    font-size: 20px;
    font-weight: 990;
  }
`;
