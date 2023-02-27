import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header``;

export const Main = styled.main``;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const DormitoryWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MonthWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-left: 12px;
  }
`;

export const NavigateToBoard = styled.div`
  background-color: #d9d9d9;
  width: 100px;
  height: 30px;
  margin-left: 30px;
  cursor: pointer;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-weight: 600;
    font-size: 12px;
  }
`;
