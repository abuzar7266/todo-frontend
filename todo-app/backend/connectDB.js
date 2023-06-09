
var mongoose = require('mongoose');

// Connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  };

const connectDB = async ()=>{
    await mongoose.connect(process.env.DB_STRING,options)
    .then(()=>console.log("Database server has been connected..."))
    .catch(e => console.log("An error has occurred while connecting with database server...", e));
}

const disconnectDB = async ()=>{
    await mongoose.disconnect().then(()=>{
        console.log('Disconnected...');
    })
    .catch(e => console.log("An error has occurred while discconnecting with database server...", e));
}

module.exports = {
    connectDB:connectDB,
    disconnectDB:disconnectDB
}
