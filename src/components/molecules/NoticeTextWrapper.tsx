import styled from 'styled-components';
import P_Manrope_ExtraBold from '../atoms/P_Manrope_ExtraBold';

const Wrapper = styled.div`
  margin-top: 70px;
`;

interface INoticeTextWrapper {
  children: React.ReactNode;
  style?: React.CSSProperties;
}
function NoticeTextWrapper({ children, style }: INoticeTextWrapper) {
  return (
    <Wrapper style={style}>
      <P_Manrope_ExtraBold style={{ fontSize: '26px' }}>
        {children}
      </P_Manrope_ExtraBold>
    </Wrapper>
  );
}

export default NoticeTextWrapper;
