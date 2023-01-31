import axios from 'axios';

export function fetchGetRestore() {
  console.log('login-check');
  return axios
    .get<number>(`/auth/restore-access-token`, { withCredentials: true })
    .then((res) => res.data);
}
