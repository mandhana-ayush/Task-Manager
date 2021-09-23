const express = require('express');
const app = express();
const cors = require('cors');

const login = require('./Controllers/fn_login');
const tasks = require('./Controllers/fn_tasks');
const connectDB = require('./db/connect');

app.use(cors());
app.use(express.json());

app.use('/', login);
app.use('/api/v1/task', tasks);

const start = async ()=>{
  try {
    await connectDB();
    app.listen(5000, ()=>{
      console.log("Port is Listening at PORT 5000");
    })
  } 
  catch (err) {
    console.log("Error");
    console.log(err);
  }
}    
start();