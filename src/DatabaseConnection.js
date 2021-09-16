const mongoose = require("mongoose");
const { log } = require("./util");

const controlSchema = require("../ControlSchema");
const rawData = require("../DummyData");

const connectionString = "mongodb://localhost/ControlsData";
const collectionName = "2021";

class DatabaseConnection {
  constructor() {
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
      if (this.collectionExists(collectionName) == 1) {
        console.log("EXISITS");
        // this.updateDocument(rawData);
      }
      //   createDocument();
    });
  } // end Constructor

  /**
   * Function to test if a collection exisits in the current database
   * @param {*} name of the collection
   * @returns
   */
  collectionExists(name) {
    log(`Searching for collection ${name} in database`);
    return this.db.db.listCollections({ name: name }).toArray((err, names) => {
      if (err) {
        console.log(err);
        return -1;
      } else {
        if (names.length > 0) {
          console.log("FOUND : \n");
          console.log(names);
          console.log("\n\n");
          return 1;
        } else {
          console.log("Collection not found");
          return 0;
        }
      }
    });
  }

  updateDocument(arg) {
    const Control = mongoose.model(collectionName, controlSchema);
    Control.findOneAndUpdate(
      { ctrlid: "1234567890" },
      { $push: { data: arg } },
      (err, success) => {
        if (err) console.log();
        else {
          console.log("Record updated. Closing Connection");
          db.close();
        }
      }
    );
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
