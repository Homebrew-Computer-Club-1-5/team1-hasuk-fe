import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  //uri임에 유의하자 그래프QL 서버의 URL 적으면 됨
  cache: new InMemoryCache(),
  // 데이터를 cache하는 방식을 결정해준다.
});

export default client;
