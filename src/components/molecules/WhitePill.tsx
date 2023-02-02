import styled from 'styled-components';

const Pill = styled.button`
  padding: 0px 10px;
  z-index: 6;
  min-width: 85px;
  font-size: 17px;
  font-weight: 600;
  border: 1px solid black;
  height: 35px;
  background-color: white;
  border-radius: 20px;
`;

interface text {
  onClickNavigator?: any;
  text: string;
  style?: React.CSSProperties;
}
function WhitePill({ text, onClickNavigator, style }: text) {
  return (
    <Pill style={style} onClick={onClickNavigator}>
      {text}
    </Pill>
  );
}

export default WhitePill;
