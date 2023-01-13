import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import '@fontsource/manrope';
import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
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
