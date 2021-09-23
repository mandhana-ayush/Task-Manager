const mongoose = require('mongoose');
const url = "mongodb://localhost/taskManager";

const connect = ()=>{
  return mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });
}

module.exports = connect;