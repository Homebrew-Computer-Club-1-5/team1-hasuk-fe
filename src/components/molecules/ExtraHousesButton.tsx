import styled from 'styled-components';
import { ReactComponent as ExtraInfos } from '../../assets/ExtraInfos.svg';

const Wrapper = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid black;
  border-radius: 50px;
  position: fixed;
  background-color: white;
  z-index: 1000;
  bottom: 80px;
  right: 20px;
  box-shadow: 0px 4px 4px 0px black;
`;
interface IMenuButton {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
function ExtraHousesButton({ onClick }: IMenuButton) {
  return (
    <Wrapper onClick={onClick}>
      <ExtraInfos
        style={{ position: 'relative', left: '5px', top: '5px', zIndex: 990 }}
      />
    </Wrapper>
  );
}

export default ExtraHousesButton;
