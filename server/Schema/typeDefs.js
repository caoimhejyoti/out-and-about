const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Badge {
    _id: ID
    name: String
    description: String
    quantity: Int
    category: Quest
  }

  type Quest {
    _id: ID
    name: String
    createdAt: String
    description: String
    quantity: Int
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    quests: [Quest]
    badges([Badge]: ID, name: String): [Badge]
    badge(_id: ID!): Badge
    user: User
    quest(_id: ID!): Quest
    
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateBadges(_id: ID!, quantity: Int!): Badge
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
