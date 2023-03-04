import styled from 'styled-components';
import X from '../../assets/XButton.png';

export const Container = styled.div`
  position: fixed;
  z-index: 10;
  width: 360px;
  height: 120px;
  bottom: 80px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  right: calc(50% - 180px);
`;
export const Wrapper = styled.div`
  width: 360px;
  height: 120px;

  border-radius: 20px;
  box-shadow: 3px 3px gray;
  background-color: whitesmoke;
  position: relative;
  display: flex;
  align-items: center;
`;

export const XButton = styled.button`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  position: absolute;
  border: none;
  top: 10px;
  left: 10px;
  background-color: whitesmoke;
  background-image: url(${X});
  background-size: cover;
  padding: 0;
`;

export const ImgWrapper = styled.div`
  width: 150px;
  height: 120px;
  border-radius: 20px;
  background-color: gray;
  background-size: cover;
  background-position: center;
`;
export const InfoWrapper = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  p {
    font-size: 13px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 10px;
  }
  div {
    display: flex;
    #title {
      width: 40px;
      margin-right: 0px;
    }
    #content {
      margin-left: 0px;
    }
  }
`;
