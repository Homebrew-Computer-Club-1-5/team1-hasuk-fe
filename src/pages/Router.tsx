import { Routes, Route } from 'react-router-dom';
import Homes from './homes/Homes';

function Router() {
  return (
    <Routes>
      <Route path="/homes" element={<Homes />}></Route>
    </Routes>
  );
}

export default Router;
