const { AuthenticationError } = require("apollo-server-express");
const { User, Quest, Badge, Tier } = require("../models");
const { signToken } = require("../utils/auth");


const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { username }) => {
      return User.findOne({ username });
    },

    me: async (parents, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
          .populate("currentTier")
          // .populate("currentQuest")
          .populate("location")
          .populate({
            path: "currentQuest",
            populate: [
              {
                path: "location",
              },
              {
                path: "badge",
              },
              {
                path: "riddle",
              },
              { path: "tier" },
            ],
          })
          .populate("collectedBadges");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (
      parent,
      { firstName, lastName, username, email, password }
    ) => {
      const currentTier = await Tier.findOne({ name: 1});
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password,
        currentTier,
      });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError(
          "Password or Email incorrect, please try again."
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError(
          "Password or Email incorrect, please try again."
        );
      }
      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
