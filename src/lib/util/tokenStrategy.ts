import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useRestoreAccessToken(
  {
    //   errorState,
    //   onRestoreSuccess,
    //   onRestoreFail,
  },
) {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/auth/restore-access-token`, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', res.data);
        // onRestoreSuccess();
      })
      .catch((err) => {
        console.log('에러메세지 : ', err.message);
        // resetAllAtoms();
        localStorage.removeItem('accessToken');
        alert('로그인 세션이 만료되였습니다. 로그인 페이지로 이동합니다.');
        navigate('/auth/login');
      });
  }, []);
}
