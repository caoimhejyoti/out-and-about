const { AuthenticationError } = require("apollo-server-express");
const { User, Quest, Badge } = require("../models");
const { signToken } = require("../utils/auth");
const mongoose = require("mongoose");


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
      const user = await User.create({
        _id: mongoose.Types.ObjectId,
        firstName,
        lastName,
        username,
        email,
        password,
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
