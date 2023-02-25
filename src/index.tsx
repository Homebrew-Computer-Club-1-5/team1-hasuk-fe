import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import ReactGA from 'react-ga';
import { QueryClient, QueryClientProvider } from 'react-query';

// react-ga
export const ANALYTICS_TRACKING_ID = process.env
  .REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID as string;
ReactGA.initialize(ANALYTICS_TRACKING_ID);
// ReactGA.pageview(window.location.pathname + window.location.search);

// apollo-client
const ENV = process.env.REACT_APP_ENV;
const uploadLink = createUploadLink({
  //uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
  uri: `http://dev.univroom.site:8000/graphql`,
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

// react-query
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </QueryClientProvider>,
);
