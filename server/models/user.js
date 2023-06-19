const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
    required: true,
  },
  image: {
    type: [String],
  },
  questStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  riddleStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  collectedBadges: [
    {
      type: Schema.Types.ObjectId,
      ref: "Badge",
    },
  ],
  currentTier: {
    type: Schema.Types.ObjectId,
    ref: "Tier",
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
  currentQuest: {
    type: Schema.Types.ObjectId,
    ref: "Quest",
  },
  QRStatus: {
    type: Boolean,
    default: false,
  },
});


// Defining a methot that will compare a given password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
