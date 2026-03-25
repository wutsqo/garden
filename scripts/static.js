import fs from "fs";

const main = async () => {
  const contentSrc = `./content/public/images/`;
  const contentDst = `./public/images/`;

  console.log(" ✊Collecting static files...");
  fs.rmSync(contentDst, { recursive: true, force: true });
  if (!fs.existsSync(contentSrc)) {
    console.log(" 🤙No static content directory found. Skipping copy.");
    return;
  }

  fs.cpSync(contentSrc, contentDst, { recursive: true });
  console.log(" 🤙Static files collected.");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
