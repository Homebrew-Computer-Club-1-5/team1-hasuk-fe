import axios from 'axios';
import { useRecoilState } from 'recoil';
import { IloggedInUserInfo, loggedInUserInfoAtom } from '../../store/atoms';

export function loginCheck() {
  const accessToken = localStorage.getItem('accessToken');
  const isLogined = !!accessToken;
  return isLogined;
}

export function userCheck() {
  const accessToken = localStorage.getItem('accessToken');

  // 1. authorization header 에 액세스 토큰 넣어서 보내기
  return axios
    .get<IloggedInUserInfo>(
      //`${process.env.REACT_APP_SERVER_URL}/api/auth/login-check`,
      `http://dev.univroom.site:8000/api/auth/login-check`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(`${err.message}`);
    });
}
