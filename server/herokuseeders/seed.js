const db = require("./../config/connection");
const {
  User,
  Badge,
  Quest,
  Location,
  QRCode,
  Riddle,
  Tier,
} = require("../models");

const locationSeeds = require("./locationSeeds.json");
const userSeeds = require("./userSeeds.json");
const tierSeeds = require("./tierSeeds.json");
const badgeSeeds = require("./badgeSeeds.json");
const riddleSeeds = require("./riddleSeeds.json");
const qrcodeSeeds = require("./qrcodeSeeds.json");
const questSeeds = require("./questSeeds.json");

db.once("open", async () => {
  try {
    await Location.deleteMany({});
    await User.deleteMany({});
    await Tier.deleteMany({});
    await Badge.deleteMany({});
    await Riddle.deleteMany({});
    await QRCode.deleteMany({});
    await Quest.deleteMany({});

    await Location.create(locationSeeds);
    console.log("-------------- Location data seeded --------------");

    // await Tier.create(tierSeeds);
    // console.log("-------------- Tier data seeded --------------");

    await User.create(userSeeds);
    console.log("-------------- User data seeded --------------");

    await Badge.create(badgeSeeds);
    console.log("-------------- Badge data seeded --------------");

    await Riddle.create(riddleSeeds);
    console.log("-------------- Riddle data seeded --------------");

    await QRCode.create(qrcodeSeeds);
    console.log("-------------- QR Code data seeded --------------");

    await Quest.create(questSeeds);
    console.log("-------------- Quest data seeded --------------");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(" 🍃 All data seeded! 🍃 ");
  process.exit(0);
});
