import { Routes, Route } from 'react-router-dom';
import Login from './auth/login/Login';
import House from './houses/house/House';
import Houses from './houses/Houses';
import Focused from './main/Focused';
import Main from './main/Main';
import MyHouse from './myhouse/MyHouse';
import NotFound from './NotFound';

function Router() {
  return (
    <Routes>
      <Route path="/houses/:region_id" element={<Houses />} />
      <Route path="/house/:house_id" element={<House />} />
      <Route path="/main" element={<Main />} />
      <Route path="/main/:focused" element={<Focused />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/myhouse" element={<MyHouse />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
