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
    $image: [String]
    $questStatus: Boolean!
    $riddleStatus: Boolean!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      location: $city
      image:$image
      questStatus: $questStatus
      riddleStatus: $riddleStatus
    ) {
      token
      user {
        _id
        username
        firstName
        lastName
        email
        password
        questStatus
        riddleStatus
        location {
          city
        }
        image
      }
    }
  }
`;

export const UPDATE_USER_BADGE = gql`
  mutation updateUserBadge($userId: ID!, $badgeId: ID!) {
    updateUserBadge(id: $userId, badgeId: $badgeId) {
      _id
      collectedBadges {
        _id
      }
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation updateStatus($userId: ID!, $quest: Boolean!, $riddle: Boolean!) {
    updateStatus(id: $userId, questStatus: $quest, riddleStatus: $riddle) {
      _id
      questStatus
      riddleStatus
    }
  }
`;

export const UPDATE_USER_QUEST = gql`
  mutation updateUserQuest($userId: ID!, $questId: ID!) {
    updateUserQuest(id: $userId, questId: $questId) {
      _id
      currentQuest {
        _id
      }
    }
  }
`;

export const UPDATE_USER_QRSTATUS = gql`
  mutation updateUserQRStatus($userId: ID!, $userStatus: Boolean!) {
  updateUserQRStatus(id: $userId, QRStatus: $userStatus) {
    _id
    QRStatus
  }
}
`;

export const UPDATE_USER_TIER = gql`
  mutation updateUserTier($userId: ID!, $tierId: ID!) {
    updateUserTier(id: $userId, tierId: $tierId) {
      _id
      currentTier {
        _id
      }
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfile( #Variabels passed in as arguments to the updateUserProfile function
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

export const UPDATE_USER_IMAGE = gql`
  mutation updateUserImage( #Variabels passed in as arguments to the updateUserImage function
    $image: [String]!
  ) {
    updateUserImage( #Properties corresponding to the filds in the returned data.
      image: $image
    ) {
      _id #Fields that being returned after function is executed
      image
    }
  }
`;

export const DELETE_USER_PROFILE = gql`
  mutation deleteUserProfile($Id: ID!) {
    deleteUserProfile(id: $Id) {
      _id
    }
  }
`;



