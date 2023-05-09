const { AuthenticationError } = require("apollo-server-express");
const { User, Quest, Badge, Tier, Location } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require('bcrypt');

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

    getBadges: async () => {
      return Badge.find();
    },
  },

  Mutation: {
    addUser: async (
      parent,
      { firstName, lastName, username, email, password, location } 
    ) => {
      const currentTier = await Tier.findOne({ name: 1 });
      const locationObject = await Location.findOne({ city: location });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        currentTier,
        location: locationObject,
      });
      const token = signToken(user)
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
    updateUserProfile: async (parent, {firstName, lastName, username, email, password }, context) => {
      if (context.user) { // Checking if the user is logged in 
      const updatedUserFields = {
            firstName: firstName || context.user.firstName, // If the new firstName is not provided, use the current one
            lastName: lastName || context.user.lastName ,  // Following the same code :
            username: username || context.user.username, 
            email: email || context.user.email, 
          };

        if (password) { // Checking if the new password is provided
          const saltRounds = 10; // Setting the number of salt rounds for bcrypt
          const hashedPassword = await bcrypt.hash(password, saltRounds); // Hashing new password using bcrypt 
          updatedUserFields.password = hashedPassword; // Updating the password filed with the hashed password
        }

        const updatedUser = await User.findByIdAndUpdate (
          context.user._id, // Finding the user by their ID
          updatedUserFields, // Updating the user's fields with the new values
          { new: true }  // Returning the updated document rather than the original one
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    }
  }
};


module.exports = resolvers;
