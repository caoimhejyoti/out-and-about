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
      { firstName, lastName, username, email, password, location }
    ) => {
      const currentTier = await Tier.findOne({ name: 1 });
      const locationObject = await Location.findOne({ city: location });
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password,
        currentTier,
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
    updateUserBadge: async (parent, { _id }, context) => {
      if(context.user){
        const addBadge = await User.findOneAndUpdate(
          {_id: context.user._id},
          {$addToSet: {collectedBadges: _id}},
          {new:true}
        )
        return addBadge
      }
      throw new AuthenticationError("you need to be logged in!")
      
      // return await User.findOneAndUpdate( 
      //   { username: username },
      //   {$set: {collectedBadges: _id} },
      //   { new: true }
      // );
    },
  },
};

module.exports = resolvers;
