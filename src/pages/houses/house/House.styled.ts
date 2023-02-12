import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 130px !important;
`;

export const Header = styled.header``;

export const Main = styled.main``;

export const Article = styled.article`
  position: relative;
`;

export const UpWrapper = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-evenly;
  position: fixed;
  z-index: 999;
  bottom: 80px;
  left: 50%;
  transform: translate(-50%, 0%);
`;

export const BoardDateP = styled.p`
  color: #717171;
  font-size: 12px;
  position: absolute;
  top: -2px;
  right: 12px;
`;
