import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Wrapper = styled.div`
  width: 100vw;
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
  h1 {
    font-size: 20px;
    margin-top: 10px;
  }
  select {
    margin-left: 55%;
    height: 20px;
    border-radius: 5px;
  }
`;
