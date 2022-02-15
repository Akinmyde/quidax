import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://quidax-feec-graphql.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

export const GET_BOOKS = gql`
  query GetBooks {
    books { 
        id, 
        image_url, 
        title, 
        subtitle, 
        publisher, 
        release_date, 
        full_description, 
        available_copies, 
        price, 
        rating, 
        likes, 
        number_of_purchases, 
        full_description, 
        authors { name }, 
        tags { name }, 
        genres { name } 
    } 
  }
`;
