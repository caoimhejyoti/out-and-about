import { gql } from "@apollo/client";

export const QUERY_THOUGHTS = gql`
  # create a GraphQL query to be executed by Apollo Client
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;
