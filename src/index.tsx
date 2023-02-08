import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import ReactGA from 'react-ga';

// react-ga
export const ANALYTICS_TRACKING_ID = process.env
  .REACT_APP_GOOGLE_ANALYTICS_ANALYTICS_TRACKING_ID as string;
ReactGA.initialize(ANALYTICS_TRACKING_ID);
// ReactGA.pageview(window.location.pathname + window.location.search);

// apollo-client
const uploadLink = createUploadLink({
  uri: 'http://172.30.1.65:8080/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink as any),
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
