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
      currentQuest {
        tierName
      }
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
      questStatus
      riddleStatus
      collectedBadges {
        _id
        name
      }
      currentQuest {
        _id
        name
        tierName
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

// export const QUERY_QUEST = gql`
//   query quest {
//     quest {
//       _id
//       name
//       tier {
//         _id
//         name
//         description
//       }
//       badge {
//         _id
//         name
//         image
//       }
//     }
//   }
// `;

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
