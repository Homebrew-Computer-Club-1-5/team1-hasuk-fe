import styled from 'styled-components';
import P_Manrope_ExtraBold from '../atoms/P_Manrope_ExtraBold';

const Container = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: cetner;
  text-align: center;
`;

interface INoticeTextWrapper {
  children: React.ReactNode;
  style?: React.CSSProperties;
  fontSize?: string;
}
function NoticeTextWrapper({ children, style, fontSize }: INoticeTextWrapper) {
  return (
    <Container style={style}>
      <P_Manrope_ExtraBold
        style={{ fontSize: `${fontSize ? fontSize : '26px'}` }}
      >
        {children}
      </P_Manrope_ExtraBold>
    </Container>
  );
}

export default NoticeTextWrapper;
