import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import '@fontsource/manrope';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ReactGA from 'react-ga';
const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
ReactGA.initialize(TRACKING_ID as string);
const client = new ApolloClient({
  // 테스트때문에 잠시 블록 처리했습니다 - 이주승 uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
  uri: `/graphql`,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
);
