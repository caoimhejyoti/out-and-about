const { AuthenticationError } = require("apollo-server-express");
const { User, Quest, Badge, Tier, Location } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { username }) => {
      return User.findOne({ username });
    },

    quest: async (parent, { tierName }) => {
      console.log("BBBBB", tierName);
      return Quest.findOne({ tierName }).populate("riddle");
    },

    me: async (parents, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
          // .populate("currentTier")
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
              // { path: "tierName" },
            ],
          })
          .populate("collectedBadges");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    getBadges: async () => {
      return Badge.find();
    },
  },

  Mutation: {
    addUser: async (
      parent,
      { firstName, lastName, username, email, password, location }
    ) => {
      const questObject = await Quest.findOne({ tierName: "Pedestrian" });
      const locationObject = await Location.findOne({ city: location });
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password,
        currentQuest: questObject,
        location: locationObject,
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
    updateUserBadge: async (parent, { id, badgeId }) => {
      console.log("Inside resolvers");
      console.log(id);
      console.log(badgeId);
      return User.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { collectedBadges: { _id: badgeId } } },
        { new: true, runValidators: true }
      );
    },
  },
};

module.exports = resolvers;
