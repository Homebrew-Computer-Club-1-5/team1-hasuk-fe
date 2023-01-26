import styled from 'styled-components';
interface IContainer {
  isSideBarOpened: boolean;
}
export const Container = styled.div<IContainer>`
  width: 50vw;
  height: 100vh;
  position: fixed;
  z-index: 1000;
  right: ${(props) => (props.isSideBarOpened ? '0px' : '-70vw')};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #efefef;
  transition: all 0.75s;
  box-shadow: -1px 0px 0px 0px lightgray;

  div {
    padding: 10px;
    text-align: center;
  }
`;

export const AuthWrapper = styled.div`
  display: flex;
  position: relative;
  top: 5px;
  justify-content: space-evenly;
  svg {
    position: relative;
    right: 12px;
  }
`;
export const GrayLine = styled.hr`
  width: 80%;
  background-color: #cecece;
`;

export const SideBarCloseButton = styled.div`
  background-color: #efefef;
  width: 12px;
  height: 50px;
  position: absolute;
  left: -30px;
  top: 45vh;
  box-shadow: -1px 1px 0px 0px lightgray;
  svg {
    position: relative;
    right: 13px;
    top: 5px;
  }
`;
