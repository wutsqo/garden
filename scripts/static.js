const fs = require("fs");

const main = async () => {
  const contentSrc = `./content/public/images/`;
  const contentDst = `./public/images/`;

  console.log("Collecting static files...");
  fs.rmSync(contentDst, { recursive: true, force: true });
  fs.cpSync(contentSrc, contentDst, { recursive: true });
  console.log("Static files collected.");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
