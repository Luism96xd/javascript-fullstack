const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
}).then(db => console.log("Connected to the Database"))
  .catch(err => console.log(err));


//"C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"