import styled from 'styled-components';
interface IContainer {
  isCurrentLocationButtonClicked: boolean;
}

export const Container = styled.div<IContainer>`
  width: 40px;
  height: 40px;
  position: fixed;
  z-index: 999999;
  right: 10px;
  top: 55px;
  background-color: ${(props) =>
    props.isCurrentLocationButtonClicked ? '#818181' : 'white'};
  border-radius: 5px;
  box-shadow: 0px 4px 4px 0px lightgray;
  cursor: pointer;
  :hover {
    background-color: #eeeeee;
  }
`;
