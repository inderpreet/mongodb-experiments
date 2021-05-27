const mongoose = require('mongoose');
const controlSchema = require('./ControlSchema');
const rawData = require('./DummyData');

const connectionString = 'mongodb://localhost/2021';

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

var isConnected = false;

// create a connection to the database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
	console.log('mongodb connected!');
	isConnected = true;
	checkCollection('control-data-1');
});

const checkCollection = (name)=>{
	db.db.listCollections({name: name}).toArray( (err, names) => {
		if (err){
			console.log(err);
			return -1;
		} 
		else {
			if(names.length > 0) {
				console.log("FOUND : \n");
				console.log(names);
				console.log("\n\n");
				return 0;
			} else {
				console.log("Collection not found")
				return 1;
			}

		}
	})
}

const updateData = (data)=> {

}

// define model - shows collection name as control 1
const Control = mongoose.model('control-data-1', controlSchema);

// create dummy data
const data = new Control(
	{
		ctrlid: '1234567890',
		month: 5,
		data: [{
			ver: '1',
			evtime: '2021-05-27',
			ctrlid: '124565667',
			eventid: '1234',
			data1: '00',
			data2: '01',
			comment: 'Test Data'
		}]
	});

// save to database
data.save( (err, res) => {
	if (err) return console.error(err);
	console.log(res);
});

setTimeout( (arg)=>{
	Control.findOneAndUpdate(
		{ ctrlid: '1234567890' },
		{ $push: { data: arg } },
		(err, success) => {
			if( err ) console.log();
			else console.log('updated');
		}
	);
}, 1500, rawData);


