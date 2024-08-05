const exec = require("child_process").exec;

const main = async () => {
  console.log(" 👏Refreshing content...");
  exec("cd ./content && git pull", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(stdout);
  }).on("exit", (code) => {
    if (code !== 0) {
      console.error(" 👎Failed to refresh content.");
      process.exit(1);
    }
    console.log(" 👍Content refreshed.");
    process.exit(0);
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
