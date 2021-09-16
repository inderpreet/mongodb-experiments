const mongoose = require('mongoose');

// define schema
const controlSchema = new mongoose.Schema({
	ctrlid: String,
	month: Number,
	data: [{
		ver: String,
		evtime: String,
		evdate: String,
		ctrlid: String,
		eventid: String,
		data1: String,
		data2: String,
		comment: String
	}]
});

module.exports = controlSchema;
