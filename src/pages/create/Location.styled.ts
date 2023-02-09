import styled from 'styled-components';
export const Container = styled.div`
  width: 80vw;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NumberH1 = styled.h1``;

export const SelectBoxWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
  div {
    position: static;
    height: 20px;
  }
`;

export const RadioWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  margin-bottom: 20px;
  p {
    display: block;
    width: 51px;
    padding-top: 20px;
  }

  div {
    margin-top: 0px;
  }
`;

export const TitleP = styled.p`
  display: inline-block;
  font-size: 12px;
  font-weight: 990;
  margin-right: 20px;
  margin-top: 3px;
  margin-left: 10px;
`;
