const TaskModel = require('../models/Tasks');

const createTask = (req, res)=>{
  TaskModel.create(req.body, (err, data)=>{
    if(err){
      return res.status(400).json({"msg": "Error!!!"})
    }
    return res.status(201).json({"msg": "Successfully Created"});
  })
}

const deleteTask = (req, res)=>{
  const _id = req.params.id;

  TaskModel.deleteOne({_id}, (err, data)=>{
    if(err){
      res.status(400).json({"msg": "Error!!"})
    }
    return res.status(200).json(data);
  })
}

const getAllTasks = (req, res)=>{
  TaskModel.find({}, (err, data)=>{
    if(err){
      return res.status(400).json({"msg": "Error!!"})
    }

    return res.status(201).json(data)
  })
}

const getSingleTask = (req, res)=>{
  const _id = req.params.id;
  TaskModel.findOne({_id}, (err, data)=>{
    if(err){
      return res.status(400).json({
        "msg": "Error!!"
      })
    }
    else{
      if(!data){
        return res.status(400).json({"msg": "Data Not Found"})
      }
      else{
        return res.status(201).json(data);
      }
    }
  })
}

const updateTask = (req, res)=>{
  const _id = req.params.id;
  console.log(_id);
console.log(req.body)
  TaskModel.updateOne({_id}, {
    task_name: req.body.task_name,
    isCompleted: req.body.isCompleted
  }, 
  (err, data)=>{
    if(err){
      return res.status(400).json({"msg": "Error"})
    }
    else{
      return res.status(201).json({"msg": "Succesfully Updated"})
    }
  })
}

module.exports = {
  getAllTasks, 
  createTask, 
  getSingleTask, 
  deleteTask,
  updateTask
}