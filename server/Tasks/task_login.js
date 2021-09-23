const LoginModel = require('../models/userLogin');

/*This function is for the creating and adding the user in the mongodb database!!*/

const createUser = (req, res)=>{
  
  LoginModel.create(req.body, (err, data)=>{
    if(err){
      return res.status(401).json({"msg": "check your values!!"})
    }
    return res.status(201).json({
      "msg": "Successfully Created!! Click on Login to Access Your Account :)"
    });
  })
}

// This function is for finding a user in the database using the req value send by the user!! 
const getUser = (req, res)=>{
  console.log(req.query)
  const user = {
    username: req.query.user,
    password: req.query.pass
  }

  LoginModel.findOne(user, (err, data)=>{
    if(err){
      console.log(err);
      return res.status(400).json({"msg": "Invalid Entry"})
    }
    else{
      if(data){
        console.log(data)
        return res.status(201).json(data);
      }
      else{
        return res.status(201).json({"msg": "value Not Found"});
      }
    }
  })
}

// This function is for getting all the value in the list of database

const getAllValue = (req, res)=>{
  LoginModel.find({}, (err, data)=>{
    if(err){
      return res.status(401).json({"msg": "Error!!"})
    }
    else{
      return res.status(201).json(data);
    }
  })
}

module.exports = {
  createUser, getUser, getAllValue
}