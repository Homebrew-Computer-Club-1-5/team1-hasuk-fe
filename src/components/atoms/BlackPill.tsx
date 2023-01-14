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
`;
interface IBlackPill {
  innerText: string;
  style?: React.CSSProperties;
}

function BlackPill({ innerText, style }: IBlackPill) {
  return <Wrapper style={style}>{innerText}</Wrapper>;
}
export default BlackPill;
