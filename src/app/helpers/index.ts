import Cookies from 'js-cookie';


import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { QUERY_ALL_BOOKS } from '../query';

const link = ApolloLink.from([
  new HttpLink({
    uri: `https://backend-readconnect.onrender.com/graphql`,
    useGETForQueries: true,
  }),
]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
  },
});


export async function fetchAllBooks() {
  const token = Cookies.get('token');
  const { data } = await client.query({
    query: QUERY_ALL_BOOKS,
    context: {
      headers: { authorization: `Bearer ${token}` }
    },
  });

  return data.allBooks;
}

