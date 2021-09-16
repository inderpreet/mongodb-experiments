const mongoose = require("mongoose");
const { log } = require("./util");

const controlSchema = require("../ControlSchema");
const rawData = require("../DummyData");

const connectionString = "mongodb://localhost/ControlsData";
const collectionName = "2021";

class DatabaseConnection {
  constructor() {
    this.isDone = 0;
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    this.isConnected = false;

    // create a connection to the database
    this.db = mongoose.connection;
    this.db.on("error", console.error.bind(console, "connection error:"));
    this.db.once("open", () => {
      console.log("mongodb connected!");
      this.isConnected = true;
      this.collectionExists(collectionName).then((ret) => {
        if (ret == 1) {
          log("Collection Exists!");
          // this.updateDocument(rawData);
        } else {
          // createCollection?
        }
        // this.isDone = 1;
      });
    });
  } // end Constructor

  closeDatabaseConnection() {
    this.db.close();
  }

  getIsDone() {
    return this.isDone;
  }

  /**
   * Function to test if a collection exisits in the current database
   * @param {*} name of the collection
   * @returns 1 if Collection is found and 0 if no match -1 if error
   */
  async collectionExists(name) {
    return new Promise((resolve, reject) => {
      this.db.db.listCollections({ name: name }).toArray((err, names) => {
        log(`Searching for collection ${name} in database`);
        if (err) {
          log(err);
          resolve(-1);
        } else {
          if (names.length > 0) {
            log("Collection Found :");
            log(names);
            resolve(1);
          } else {
            console.log("Collection not found");
            resolve(0);
          }
        }
      });
    });
  }

  /**
   * Function to test if a collection exisits in the current database
   * @param {*} name of the collection
   * @returns 1 if Collection is found and 0 if no match -1 if error
   */
  collectionExistsOld(name) {
    return this.db.db.listCollections({ name: name }).toArray((err, names) => {
      log(`Searching for collection ${name} in database`);
      if (err) {
        log(err);
        return -1;
      } else {
        if (names.length > 0) {
          log("Collection Found : \n");
          log(names);
          log("\n\n");
          return 1;
        } else {
          console.log("Collection not found");
          return 0;
        }
      }
    });
  }

  validateDataDocument(arg) {
    if (arg == null) return -1;
    if (arg.ctrlid == null) return -1;
    else return 0;
  }

  updateDocumentByCtrlId(arg) {
    if (this.validateDataDocument(arg) == -1) {
      this.isDone = 1;
      return -1;
    }
    const Control = mongoose.model(collectionName, controlSchema);
    try {
      const q = Control.findOneAndUpdate(
        { ctrlid: arg.ctrlid, month: 9 },
        { $push: { data: arg } },
        { upsert: true, maxTimeMS: 5 },
        (err, success) => {
          if (err) console.log();
          else {
            console.log("Record updated. Closing Connection");
            this.isDone = 1;
          }
        }
      );
    } catch (e) {
      print(e);
      // (err, success) => {
      //   if (err) console.log();
      //   else {
      //     console.log("Record updated. Closing Connection");
      //     this.isDone = 1;
      //   }
      // }
    } finally {
      this.isDone = 1;
    }
  } // end updateDocument

  createDocument() {
    // define model - shows collection name as control 1
    const Control = mongoose.model(collectionName, controlSchema);

    // create dummy data
    const data = new Control({
      ctrlid: "1234567890",
      month: 5,
      data: [
        {
          ver: "1",
          evtime: "2021-05-27",
          ctrlid: "124565667",
          eventid: "1234",
          data1: "00",
          data2: "01",
          comment: "Test Data",
        },
      ],
    });
    // save to database
    data.save((err, res) => {
      if (err) return console.error(err);
      console.log(res);
    });
    setTimeout(updateDocument, 1500, rawData);
  } // end create document
}

module.exports = DatabaseConnection;
