const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Badge {
    _id: ID
    name: String!
    description: String
    quest: Quest!
    image: String! 
  }

  input Badge{
    name: String
    description: String
    quest: Quest
    image: String 
  }

  type Quest {
    _id: ID
    name: String!
    createdAt: String!
    createdBy: User!
    description: String!
    tier: Tier!
    location: Location!
    badge: Badge!
    riddle: Riddle!
  }


  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    username: String!
    collectedBadges: [Badge]
    currentTier: Tier!
  }

  type Tier { 
    _id: ID
    name: String!
    description: String
  }

  input Tier{
    name: String
  }

  type Location {
    _id: ID
    city: String!
    country: String!
  }

  input Location{
    city: String
    country: String
  }

  type Ridde { 
    _id: ID
    question: String!
    answer: String! 
    quest: Quest
  }

  input Riddle {
    question: String
    answer: String
    quest: Quest
  }

  type QRCode {
    id: ID
    image: String!
    link: String!
    quest: Quest!
  }

  input QRCode {
    image: String
    link: String
    quest: Quest
  }

  type Auth {
    token: ID
    user: User
  }

  input QuestInput{
    name: String
    createdAt: String
    createdBy: String 
    Description: String
    tier: String 
    location: String
    badge: String
    riddle: String
    QRCode: String
  }

  type Query {
    quest(_id: ID!): Quest
    quests(input: QuestInput)[Quest]
    badge(_id: ID!): Badge
    badges(name: String! image: String!): [Badge]
    users: [User]
    me: User
    user(username: String!): User
    location(_id: ID!): Location
    locations(city: String!, country: String!): [Location]
    qrcode(_id: ID!): QRCode
    qrcodes(image: String!, link: String!): [QRCode]
    riddle(_id: ID!): Riddle
    riddles(question: String!, answer: String!): [Riddle]
    tier(_id: ID!): Tier
    tiers(name: String!): [Tier]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addQuest(input: QuestInput): Quest
    addBadge(input: BadgeInput): Badge
    addTier(input: TierInput): Tier
    addLocation(input: LocationInput): Location
    addQRCode(input: QRCodeInput): QRCode
    addRiddle(input: RiddleInput): Riddle
    removeQuest(questId: ID!): Quest
    removeBadge(badgeId: ID!): Badge
    removeTier(tierId: ID!): Tier
    removeLocation(locationId: ID!): Location
    removeQRCode(QRCodeId: ID!): QRCode
    removeRiddle(riddleId: ID!): Riddle
    updateRiddle(id:ID!, question:String, answer:String): Riddle
  }
`;

module.exports = typeDefs;
