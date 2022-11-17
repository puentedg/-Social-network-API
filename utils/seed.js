const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomUser, getRandomThought, getRandomEmail } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  const thoughts = getRandomThought(5);

  for (let i = 0; i < 10; i++) {
    const username = getRandomUser();
    const email = getRandomEmail();

    users.push({
      username,
      email,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});