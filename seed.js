const { green, red } = require("chalk");
const { db } = require("./server/db");
const {
  models: { User },
} = require("./server/db");

const seed = async () => {
  try {
    await db.sync({ force: true });
    const users = await Promise.all([
      User.create({
        name: "Jo Hicks",
        email: "johicks@aquasseur.com",
        password: User.generateHash("xxqwyn@-!7"),
        imageUrl: "https://bit.ly/3m78SSX",
        googleId: "jo.hicks"
      }),
      User.create({
        name: "Millie Henderson",
        email: "milliehenderson@aquasseur.com",
        password: User.generateHash("onwfe$hc&&@"),
        imageUrl: "https://bit.ly/2Tb4GoS",
        googleId: "millie.henderson"
      }),
      User.create({
        name: "Wayne Garcia",
        email: "wayne.garcia@whatelse.com",
        password: User.generateHash("y3w89hy1!"),
        imageUrl: "https://bit.ly/2FRcRDK",
        googleId: "wayne.garcia"
      })
    ]);
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
