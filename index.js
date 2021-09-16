const DatabaseConnection = require("./src/DatabaseConnection");

var db = new DatabaseConnection();

// const mongoose = require("mongoose");
// const controlSchema = require("./ControlSchema");
// const rawData = require("./DummyData");

// const connectionString = "mongodb://localhost/ControlsData";
// const collectionName = "2021";

// mongoose.connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// var isConnected = false;

// // create a connection to the database
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("mongodb connected!");
//   isConnected = true;
//   if (collectionExists(collectionName) == 1) {
//     console.log("EXISITS");
//     updateDocument(rawData);
//   }
//   //   createDocument();
// });

// /**
//  * Function to test if a collection exisits in the current database
//  * @param {*} name of the collection
//  * @returns 
//  */
// const collectionExists = (name) => {
//   return db.db.listCollections({ name: name }).toArray((err, names) => {
//     if (err) {
//       console.log(err);
//       return -1;
//     } else {
//       if (names.length > 0) {
//         console.log("FOUND : \n");
//         console.log(names);
//         console.log("\n\n");
//         return 1;
//       } else {
//         console.log("Collection not found");
//         return 0;
//       }
//     }
//   });
// };

// const createDocument = () => {
//   // define model - shows collection name as control 1
//   const Control = mongoose.model(collectionName, controlSchema);

//   // create dummy data
//   const data = new Control({
//     ctrlid: "1234567890",
//     month: 5,
//     data: [
//       {
//         ver: "1",
//         evtime: "2021-05-27",
//         ctrlid: "124565667",
//         eventid: "1234",
//         data1: "00",
//         data2: "01",
//         comment: "Test Data",
//       },
//     ],
//   });

//   // save to database
//   data.save((err, res) => {
//     if (err) return console.error(err);
//     console.log(res);
//   });

//   setTimeout(updateDocument, 1500, rawData);
// };

// const updateDocument = (arg) => {
//   const Control = mongoose.model(collectionName, controlSchema);
//   Control.findOneAndUpdate(
//     { ctrlid: "1234567890" },
//     { $push: { data: arg } },
//     (err, success) => {
//       if (err) console.log();
//       else {
//         console.log("Record updated. Closing Connection");
//         db.close();
//       }
//     }
//   );
// };
