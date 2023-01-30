import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ReactComponent as CreateHouseIcon } from '../../assets/CreateHouseIcon.svg';
import { accessTokenAtom } from '../../store/atoms';

const Wrapper = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid black;
  border-radius: 50px;
  position: absolute;
  background-color: white;
  z-index: 1000;
  top: 10px;
  left: 10px;
  box-shadow: 0px 4px 4px 0px black;
`;

function CreateHouseButton() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const navigate = useNavigate();
  return (
    <Wrapper
      onClick={() => {
        if (accessToken) navigate('/create');
        else {
          alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
          navigate('/auth/login');
        }
      }}
    >
      <CreateHouseIcon
        style={{ position: 'relative', left: '10px', top: '2px' }}
      />
    </Wrapper>
  );
}

export default CreateHouseButton;
