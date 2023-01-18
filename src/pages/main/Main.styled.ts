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
    margin-left: 40%;
    height: 20px;
    border-radius: 5px;
  }
`;

export const versionBox = styled.div`
  display: inline-block;
  border: 1px solid grey;
  padding: 0px 5px;
  margin-left: 5px;
  margin-top: 5px;
  border-radius: 5px;
  height: 15px;
  background-color: black;
  font-weight: 660;
  color: white;
  font-size: 10px;
`;
