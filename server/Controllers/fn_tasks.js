const express = require('express');
const router = express.Router();

const {getAllTasks, createTask, getSingleTask, deleteTask, updateTask} = require('../Tasks/task')

/*
api/v1/task - post 
api/v1/task - getAll
api/v1/task/:id - getSingle
api/v1/task/:id - delete Single
api/v1/task/:id - update value
*/

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getSingleTask).delete(deleteTask).patch(updateTask);

module.exports = router;