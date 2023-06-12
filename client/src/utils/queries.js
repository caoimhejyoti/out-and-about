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
      image
      currentQuest {
        tierName
      }
    }
  }
`;

export const CHECK_QR = gql`
query checkQR($qrpass: String!) {
  checkQR(qrpass: $qrpass) {
    qrpass
  }
}
`;

export const QUERY_QUEST = gql`
  query quest($tierName: String!) {
    quest(tierName: $tierName) {
      _id
      name
      description
      tierName
      riddle {
        question
        answer
        options
      }
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
      image
      questStatus
      riddleStatus
      QRStatus
      collectedBadges {
        _id
        name
      }
      currentTier {
        _id
        name
      }
      currentQuest {
        _id
        name
        tierName
        questPass
        location {
          _id
          city
          country
        }
        badge {
          _id
          name
          description
          colour_image
          greyscale_image
        }
        riddle {
          _id
          question
          answer
        }
        status
      }
    }
  }
`;

export const GET_BADGES = gql`
  query getBadges {
    getBadges {
      _id
      name
      description
      colour_image
      greyscale_image
    }
  }
`;
