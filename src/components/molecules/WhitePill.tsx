import styled from 'styled-components';

const Pill = styled.button`
  padding: 0px 10px;
  z-index: 6;
  width: max-content;
  font-size: 17px;
  font-weight: 600;
  border: 1px solid black;
  height: 35px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 3px 3px 0px gray;
  font-family: 'Manrope';
  cursor: pointer;
`;

interface text {
  onClick?: () => void;
  text: string;
  style?: React.CSSProperties;
}
function WhitePill({ text, onClick, style }: text) {
  return (
    <Pill style={style} onClick={onClick}>
      {text}
    </Pill>
  );
}

export default WhitePill;
