import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
    $city: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      location: $city
    ) {
      token
      user {
        _id
        username
        firstName
        lastName
        email
        password
        location {
          city
        }
      }
    }
  }
`;

export const UPDATE_USER_BADGE = gql`
  mutation updateUserBadge($username: String!, $badgeName: String!) {
    updateUserBadge(username: $username, name: $badgeName) {
      username
      collectedBadges {
        _id
        name
      }
    }
  }
`;
