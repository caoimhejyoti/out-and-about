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
    questPass: String
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    username: String!
    questStatus: Boolean!
    riddleStatus: Boolean!
    collectedBadges: [Badge]
    currentQuest: Quest
    currentTier: Tier
    location: Location
    QRStatus: Boolean!
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
    checkQR(qrpass: String!): Quest
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
      questStatus: Boolean!
      riddleStatus: Boolean!
    ): Auth
    updateUserProfile(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
    ): User
    updateUserBadge(id: ID!, badgeId: ID!): User
    updateStatus(id: ID!, questStatus: Boolean!, riddleStatus: Boolean!): User
    updateUserQuest(id: ID!, questId: ID!): User
    updateUserTier(id: ID!, tierId: ID!): User
    deleteUserProfile(id: ID!): User
    updateUserQRStatus(id: ID!, QRStatus: Boolean!): User
  }
`;

module.exports = typeDefs;
