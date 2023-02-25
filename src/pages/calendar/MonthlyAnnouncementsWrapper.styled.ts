import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header``;

export const Main = styled.main``;

export const Section = styled.section`
  p {
    text-align: center;
    font-weight: 800;
    font-size: 20px;
  }
`;

export const Article = styled.article``;

export const Footer = styled.footer``;

export const AnnouncementWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  height: 60px;
  margin: 20px 0;
`;

export const DateP = styled.p`
  padding: 20px;
  font-weight: 400;
`;

export const postTitleP = styled.p`
  margin-left: 15px;
  width: 200px;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;
