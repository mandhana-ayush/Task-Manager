const mongoose = require('mongoose');

const LoginModel = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    trim: true,
  }, 
  password: {
    type: String,
    required: true
  },
  tasks_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks"
    }
  ]

})

module.exports = mongoose.model('Login', LoginModel);
