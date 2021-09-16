const DatabaseConnection = require("./src/DatabaseConnection");

const DummyData = require("./DummyData");

const main = async () => {
  var db = new DatabaseConnection();
  db.updateDocumentByCtrlId(DummyData);

  const checkAndExitProgram = setInterval(() => {
    if (db.getIsDone() == 1) {
      db.closeDatabaseConnection();
      console.log("Closing DB Connection");
      process.exit(0);
    }
  }, 100);
};

main();
