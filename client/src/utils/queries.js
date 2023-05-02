import { gql } from "@apollo/client";


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
        _id
        firstName
        lastName
        email
        password
        username
    }
  }
`;



export const QUERY_ME = gql`
  query me {
    me {
        _id
        firstName
        lastName
        email
        password
        username
      }
  }
`;
