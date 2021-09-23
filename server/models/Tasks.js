const mongoose = require('mongoose');

const TaskModel = mongoose.model('tasks', new mongoose.Schema({
  task_name: {
    type: String,
    required:[true, "Please input the value"],
    trim: true
  }, 
  isCompleted: {
    type: Boolean, 
    default: false
  },
  user_details: mongoose.Schema.Types.ObjectId
}));

module.exports = TaskModel;