const { AuthenticationError } = require("apollo-server-express");
const { User, Quest, Badge, Tier, Location } = require("../models/index");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    checkQR: async () => {
      console.log("Checking");
    },

    user: async (parent, { username }) => {
      return User.findOne({ username });
    },

    quest: async (parent, { tierName }) => {
      // console.log("BBBBB", tierName);
      return Quest.findOne({ tierName }).populate("riddle");
    },

    me: async (parents, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
          // .populate("questStatus")
          // .populate("riddleStatus")
          .populate("location")
          .populate("currentTier")
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
              {
                path: "questPass",
              },
              // { path: "tierName" },
            ],
          })
          .populate("collectedBadges")
          .populate("QRStatus");
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
      {
        firstName,
        lastName,
        username,
        email,
        password,
        questStatus,
        riddleStatus,
        location,
        image,
      }
    ) => {
      // const startingStatus = false;
      const questObject = await Quest.findOne({ tierName: "Pedestrian" });
      const locationObject = await Location.findOne({ city: location });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        currentQuest: questObject,
        questStatus,
        riddleStatus,
        location: locationObject,
        image,
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
    updateUserProfile: async (
      parent,
      { firstName, lastName, username, email, password },
      context
    ) => {
      if (context.user) {
        // Checking if the user is logged in
        const updatedUserFields = {
          firstName: firstName || context.user.firstName, // If the new firstName is not provided, use the current one
          lastName: lastName || context.user.lastName, // Following the same code :
          username: username || context.user.username,
          email: email || context.user.email,
        };

        if (password) {
          // Checking if the new password is provided
          const saltRounds = 10; // Setting the number of salt rounds for bcrypt
          const hashedPassword = await bcrypt.hash(password, saltRounds); // Hashing new password using bcrypt
          updatedUserFields.password = hashedPassword; // Updating the password filed with the hashed password
        }

        const updatedUser = await User.findByIdAndUpdate(
          context.user._id, // Finding the user by their ID
          updatedUserFields, // Updating the user's fields with the new values
          { new: true } // Returning the updated document rather than the original one
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // updateUserImage: async (parent, {id, image }, context) => {
    //   if (context.user) {
    //     // Checking if the user is logged in
    //     const updatedUserFields = {
    //       image: image || context.user.image,
    //     };

    //     const updatedUser = await User.findByIdAndUpdate(
    //       context.user._id, // Finding the user by their ID
    //       updatedUserFields, // Updating the user's fields with the new values
    //       { new: true } // Returning the updated document rather than the original one
    //     );
    //     return updatedUser;
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },

    deleteUserProfile: async (parent, { id, args }, context) => {
      console.log(id);
      const delUser = await User.findByIdAndDelete({ _id: id }, { new: true });
      return delUser;
    },

    updateUserBadge: async (parent, { id, badgeId }) => {
      console.log("Inside updateUserBadge");
      console.log(id);
      console.log(badgeId);
      return User.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { collectedBadges: { _id: badgeId } } },
        { new: true, runValidators: true }
      );
    },
    updateUserQRStatus: async (parent, { id, QRStatus }) => {
      console.log("Inside updateQRPass");
      let newStatus = { QRStatus: true };
      if (QRStatus === true) {
        console.log("Inside updateQR IF");
        newStatus = { QRStatus: false };
      }
      return User.findByIdAndUpdate({ _id: id }, newStatus, { new: true });
    },
    updateStatus: async (parent, { id, questStatus, riddleStatus }) => {
      console.log("Inside updateStatus");
      console.log(id);
      console.log(questStatus);
      console.log(riddleStatus);
      return User.findByIdAndUpdate(
        { _id: id },
        { $set: { questStatus: questStatus, riddleStatus: riddleStatus } },
        { new: true, runValidators: true }
      );
    },
    updateUserQuest: async (parent, { id, questId }) => {
      console.log("Inside updateUserQuest");
      console.log(id);
      console.log(questId);
      return User.findByIdAndUpdate(
        { _id: id },
        { currentQuest: questId },
        { new: true, runValidators: true }
      );
    },
    updateUserTier: async (parent, { id, tierId }) => {
      console.log("Inside updateUserTier");
      console.log(id);
      console.log(tierId);
      return User.findByIdAndUpdate(
        { _id: id },
        { currentTier: tierId },
        { new: true, runValidators: true }
      );
    },
  },
};

module.exports = resolvers;
