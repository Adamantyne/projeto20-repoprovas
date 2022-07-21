import db from "../src/config/database.js";

async function main() {}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
