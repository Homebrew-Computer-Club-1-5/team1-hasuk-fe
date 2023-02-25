import { Routes, Route } from 'react-router-dom';
import Login from './auth/login/Login';
import Create from './create/Create';
import ExHouses from './exhouses/ExHouses';
import AllHouses from './allhouses/AllHouses';
import House from './houses/house/House';
import Houses from './houses/Houses';
import Main from './main/Main';
import NotFound from './NotFound';
import Up from './up/Up';
import MyPage from './mypage/MyPage';
import MyHouse from './mypage/myhouse/MyHouse';
import Help from './help/Help';
import Article_1 from './help/article/Article_1';
import MyLikedHouse from './mypage/mylikedhouse/MyLikedHouse';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/houses/:region_id" element={<Houses />} />
      <Route path="/allhouses" element={<AllHouses />} />
      <Route path="/exhouses" element={<ExHouses />} />
      <Route path="/house/:house_id" element={<House />} />
      <Route path="/up" element={<Up />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/create" element={<Create />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/myhouse" element={<MyHouse />} />
      <Route path="/mypage/mylikedhouse" element={<MyLikedHouse />} />
      <Route path="/help" element={<Help />} />
      <Route path="/help/article/1" element={<Article_1 />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
