import styled from 'styled-components';

const Pill = styled.button`
  padding: 0px 10px;
  z-index: 6;
  min-width: 85px;
  font-size: 17px;
  font-weight: 600;
  border: 1px solid black;
  height: 35px;
  background-color: black;
  border-radius: 20px;
`;

interface text {
  onClickNavigator: () => void;
  text: string;
}
function WhitePill({ text, onClickNavigator }: text) {
  return <Pill onClick={onClickNavigator}>{text}</Pill>;
}

export default WhitePill;
