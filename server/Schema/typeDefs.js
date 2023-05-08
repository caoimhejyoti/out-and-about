const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Badge {
    _id: ID
    name: String!
    description: String
    quest: Quest!
    colour_image: String!
    greyscale_image: String!
  }

  type Quest {
    _id: ID
    name: String!
    createdAt: String!
    createdBy: User!
    description: String!
    tierName: String!
    location: Location!
    badge: Badge!
    riddle: Riddle!
    status: Boolean!
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    username: String!
    collectedBadges: [Badge]
    currentQuest: Quest
    location: Location
  }

  type Tier {
    _id: ID
    name: Int!
    description: String
  }

  type Location {
    _id: ID
    city: String!
    country: String!
  }

  type Riddle {
    _id: ID
    question: String!
    answer: String!
    options: [String]
  }

  type QRCode {
    id: ID
    image: String!
    link: String!
    quest: Quest!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    me: User
    quest(tierName: String!): Quest
    user(username: String!): User
    getBadges: [Badge]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
      location: String!
    ): Auth
    updateUserBadge(username: String!, name: String!): User
  }
`;

module.exports = typeDefs;
