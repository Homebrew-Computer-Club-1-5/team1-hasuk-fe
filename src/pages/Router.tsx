import { Routes, Route } from 'react-router-dom';
import Houses from './houses/Houses';
import Focused from './main/Focused';
import Main from './main/Main';

function Router() {
  return (
    <Routes>
      <Route path="/homes" element={<Houses />} />
      <Route path="/main" element={<Main />} />
      <Route path="/main/:focused" element={<Focused />} />
    </Routes>
  );
}

export default Router;
