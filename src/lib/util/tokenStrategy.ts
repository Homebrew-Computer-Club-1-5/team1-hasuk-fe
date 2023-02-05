import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IrestoreAccessToken {
  onRestoreSuccess: () => void;
  onRestoreFail?: () => void;
}

export default function useRestoreAccessToken() {
  const navigate = useNavigate();

  function restoreAccessToken({
    onRestoreSuccess,
    onRestoreFail,
  }: IrestoreAccessToken) {
    axios
      .get(`/api/auth/restore-access-token`, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', res.data);
        console.log('액세스 토큰 갱신완료');
        onRestoreSuccess();
      })
      .catch((err) => {
        console.log('로그인 세션 만료 : ', err.message);
        localStorage.removeItem('accessToken');
        alert('로그인 세션이 만료되였습니다. 로그인 페이지로 이동합니다.');
        navigate('/auth/login');
      });
  }
  return restoreAccessToken;
}
