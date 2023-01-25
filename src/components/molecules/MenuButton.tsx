import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MenuIcon } from '../../assets/MenuIcon.svg';

const Wrapper = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid black;
  border-radius: 50px;
  position: absolute;
  background-color: white;
  z-index: 1000;
  top: 10px;
  right: 10px;
  box-shadow: 0px 4px 4px 0px black;
`;

function MenuButton() {
  const navigate = useNavigate();
  return (
    <Wrapper onClick={() => {}}>
      <MenuIcon style={{ position: 'relative', left: '10px', top: '10px' }} />
    </Wrapper>
  );
}

export default MenuButton;
