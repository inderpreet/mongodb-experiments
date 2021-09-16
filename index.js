const DatabaseConnection = require("./src/DatabaseConnection");

const main = async () => {
  var db = new DatabaseConnection();

  const checkAndExitProgram = setInterval(() => {
    if (db.getIsDone() == 1) {
      db.closeDatabaseConnection();
      console.log("Closing DB Connection");
      process.exit(0);
    }
  }, 100);
};

main();
