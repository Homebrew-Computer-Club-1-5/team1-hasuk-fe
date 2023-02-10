import Router from './pages/Router';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import RouteChangeTracker from './RouteChangeTracker';
import NavBar from './components/molecules/NavBar';

function App() {
  RouteChangeTracker();
  return (
    <RecoilRoot>
      <Router />
      <NavBar />
    </RecoilRoot>
  );
}

export default App;
