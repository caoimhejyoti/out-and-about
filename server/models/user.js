const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

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
    minlength: 5,
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
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
});

// Defining a pre-hook that will hash the password before saving the user 
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

// Defining a methot that will compare a given password with the hashed password 
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
