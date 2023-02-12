import { Routes, Route } from 'react-router-dom';
import Login from './auth/login/Login';
import Create from './create/Create';
import ExHouses from './exhouses/ExHouses';
import AllHouses from './allhouses/AllHouses';
import House from './houses/house/House';
import Houses from './houses/Houses';
import Main from './main/Main';
import MyHouse from './myhouse/MyHouse';
import NotFound from './NotFound';
import Up from './up/Up';

function Router() {
  return (
    <Routes>
      <Route path="/houses/:region_id" element={<Houses />} />
      <Route path="/allhouses" element={<AllHouses />} />
      <Route path="/exhouses" element={<ExHouses />} />
      <Route path="/house/:house_id" element={<House />} />
      <Route path="/up" element={<Up />} />
      <Route path="/main" element={<Main />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/myhouse" element={<MyHouse />} />
      <Route path="/create" element={<Create />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
