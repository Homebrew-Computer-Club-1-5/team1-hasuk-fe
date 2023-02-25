import styled from 'styled-components';
export const mapWrapper = styled.main`
  width: 100vw;
  height: 95vh;
  position: relative;
`;

export const Legend = styled.section`
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
`;
