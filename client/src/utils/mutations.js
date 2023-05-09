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
  mutation updateUserBadge($badgeId: ObjectId) # $badgeName: String!
  # $username: Sting!
  # $userId: ObjectId!
  {
    updateUserBadge(_id: $badgeId) {
      collectedBadges {
        _id
      }
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfile(  #Variabels passed in as arguments to the updateUserProfile function
    $firstName: String! 
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    updateUserProfile( #Properties corresponding to the filds in the returned data. 
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      _id #Fields that being returned after function is executed
      firstName
      lastName
      username
      email
      password
    }
  }
`;


