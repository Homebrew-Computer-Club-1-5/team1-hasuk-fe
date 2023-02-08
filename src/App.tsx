import Router from './pages/Router';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import RouteChangeTracker from './RouteChangeTracker';

function App() {
  RouteChangeTracker();
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
}

export default App;
