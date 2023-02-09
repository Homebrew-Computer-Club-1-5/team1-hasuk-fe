import styled from 'styled-components';

const Wrapper = styled.p`
  display: inline-block;
  height: 20px;
  line-height: 20px;
  font-family: 'Manrope-Light';
  font-size: 12px;
  color: white;
  background-color: black;
  border-radius: 30px;
  padding: 0px 7px;
  text-align: center;
  margin: 0;
`;
interface IBlackPill {
  innerText: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function BlackPill({ innerText, style, onClick }: IBlackPill) {
  return (
    <Wrapper style={style} onClick={onClick}>
      {innerText}
    </Wrapper>
  );
}
export default BlackPill;
