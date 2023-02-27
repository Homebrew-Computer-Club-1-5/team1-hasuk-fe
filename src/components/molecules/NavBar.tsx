import { useNavigate } from 'react-router-dom';
import { ReactComponent as NavBar_AllHouses } from '../../assets/NavBar_AllHouses.svg';
import { ReactComponent as NavBar_CreateHouse } from '../../assets/NavBar_CreateHouse.svg';
import { ReactComponent as NavBar_Profile } from '../../assets/NavBar_Profile.svg';
import { ReactComponent as NavBar_Main } from '../../assets/NavBar_Main.svg';
import { ReactComponent as NavBar_Up } from '../../assets/NavBar_Up.svg';
import { ReactComponent as NavBar_Calendar } from '../../assets/NavBar_Calendar.svg';

import * as S from './NavBar.styled';
import useResetAllAtoms from '../../lib/util/resetAllAtoms';
import { useRecoilState } from 'recoil';
import { isEditingAtom, statusAtom } from '../../store/atoms';

function NavBar() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const isLogined = !!accessToken;
  const resetAllAtoms = useResetAllAtoms();
  const [stat, setStat] = useRecoilState(statusAtom);
  const [isEditing, setIsEditing] = useRecoilState(isEditingAtom);

  return (
    <S.Nav>
      <S.Ul>
        <S.Li
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/dormitory/calendar');
          }}
        >
          <NavBar_Calendar style={{ position: 'relative', top: '4px' }} />
          <p>{'기숙사 정보'}</p>
        </S.Li>
        <S.Li
          style={{ position: 'relative', bottom: '3px', cursor: 'pointer' }}
          onClick={() => {
            navigate('/allhouses');
          }}
        >
          <NavBar_AllHouses style={{ position: 'relative', top: '4px' }} />
          <S.AllHousesP>모든 집 보기</S.AllHousesP>
        </S.Li>
        <S.Li
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/');
          }}
        >
          <NavBar_Main style={{ position: 'relative', top: '4px' }} />
          <S.MainP>메인</S.MainP>
        </S.Li>
        <S.Li
          style={{ position: 'relative', bottom: '4px', cursor: 'pointer' }}
          onClick={() => {
            resetAllAtoms();
            setStat({ status: 0 });
            setIsEditing(false);
            navigate('/create');
          }}
        >
          <NavBar_CreateHouse
            style={{ position: 'relative', bottom: '-4px', left: '4px' }}
          />
          <S.CreateHouseP>내 집 추가</S.CreateHouseP>
        </S.Li>
        <S.Li
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (isLogined) navigate('/up');
            else navigate('/auth/login');
          }}
        >
          <NavBar_Up style={{ position: 'relative', top: '4px' }} />
          <S.UpP>UP</S.UpP>
        </S.Li>
        <S.Li
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/mypage');
          }}
        >
          <NavBar_Profile style={{ position: 'relative', top: '4px' }} />
          <S.ProfileP>{'마이 페이지'}</S.ProfileP>
        </S.Li>
      </S.Ul>
    </S.Nav>
  );
}

export default NavBar;
