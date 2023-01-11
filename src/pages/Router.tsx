import { Routes, Route } from 'react-router-dom';
import Homes from './homes/Homes';
import Focused from './main/Focused';
import Main from './main/Main';

function Router() {
  return (
    <Routes>
      <Route path="/homes" element={<Homes />} />
      <Route path="/main" element={<Main />} />
      <Route path="/main/:focused" element={<Focused />} />
    </Routes>
  );
}

export default Router;
