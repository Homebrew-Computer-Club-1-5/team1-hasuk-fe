import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.header``;

export const Main = styled.main`
  width: 100%;
`;

export const Section = styled.section``;

export const Article = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Footer = styled.footer``;

export const ContactWrapper = styled.div`
  margin: 20px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 0px 20px;
  img {
    width: 60px;
    height: 60px;
  }
`;

export const ContactTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0px;
  height: 100%;
`;
export const ContactTitleP = styled.div`
  margin-left: 20px;
  font-weight: 700;
  font-size: 24px;
  line-height: 50%;
`;

export const ContactInfoP = styled.p`
  margin: 10px 0px;
`;

export const GrayLine = styled.hr`
  width: 80%;
  background-color: #cecece;
`;
