import { HttpLink } from "apollo-boost";

export const getGQLLink = (fetch, cookie) => new HttpLink({
  uri: 'https://graphql.staging.ipsy.com/graphql',
  credentials: 'same-origin',
  headers: {
    cookie,
  },
  fetch
});