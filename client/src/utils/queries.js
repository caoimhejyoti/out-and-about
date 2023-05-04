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
      currentTier {
        _id
        name
        description
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
      currentTier {
        _id
        name
        description
      }
      currentQuest {
        _id
        name
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

export const QUERY_QUEST = gql`
  query quest {
    quest {
      _id
      name
      tier {
        _id
        name
        description
      }
      badge {
        _id
        name
        image
      }
    }
  }
`;
