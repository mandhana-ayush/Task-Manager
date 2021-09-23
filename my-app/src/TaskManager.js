import React, {useState, useEffect, useRef} from 'react'
import EditOption from './EditOption';

function TaskManager(props) {
  const taskValueContainer = useRef(null);

  const [deleteId, setDeleteId] = useState('');
  const [editID, setEditID] = useState('');

  const [data, setData] = useState([]);

  const [editOption, setEditOption] = useState(false);
  const [deleteOption, setDeleteOption] = useState(false);
  const [post_task, setPost_task] = useState(false);  
  const [handlerVal, setHandlerVal] = useState(false);

  const deleteHandler = (e)=>{
    setDeleteId(e.target.dataset.id);
    setDeleteOption(true);
  }
  
  const EditHandler = (e)=>{
    setEditID(e.target.dataset.id);
    setEditOption(true);
  }

  useEffect(()=>{
    if(deleteOption){
      fetch(`http://localhost:5000/api/v1/task/${deleteId}`, {method: "DELETE"})
    }
    setDeleteOption(false);
  }
  ,[deleteOption]);
  
  useEffect(()=>{
    fetch('http://localhost:5000/api/v1/task')
    .then(resp=>resp.json())
    .then(data=>{
      setData(data);
      setHandlerVal(true);
    })
  },
  [editOption, deleteOption, post_task]
  );

  useEffect(()=>{
    if(post_task){
      const data= {
        task_name:taskValueContainer.current.value,
        user_details: props.data._id,
      }

      const options = {
        method: "POST",
        headers:{
          'Content-type':"application/json"
        },
        body:JSON.stringify(data)
      }

      fetch('http://localhost:5000/api/v1/task',options)
      .then((resp)=>resp.json())
      .then((json)=>{
        taskValueContainer.current.value= '';
        setPost_task(false);
      })
    }
  },[post_task]);

  return(
    !editOption && handlerVal? (
  <div className="taskContainer">      
    <form onSubmit={(e)=>{
      e.preventDefault();
      setPost_task(true);
    }}>
      <input 
      type="text" 
      name="taskInput" 
      placeholder="e.g.washing dishes"
      className="task_input"
      ref={taskValueContainer}
      />
      <button type="submit" className="submit_btn">Submit</button>
    </form>
    {data.length && (
        <>
        {data.map((item)=>{
          if(props.data._id === item.user_details){       
            return(
              <div className="task_single_container" key={item._id}>
                {!item.isCompleted? 
                <input type="checkbox" name="isCompleted" className="isCompleted" disabled={true} />:
                <input type="checkbox" className="isCompleted" name="isCompleted" disabled={true} checked/>
                }
                <div className="task_name">{item.task_name}</div>
                <button type="button" className="edit_btn" data-id={item._id} onClick={EditHandler}>Edit</button>
                <button type="button" className="delete_btn" onClick={deleteHandler} data-id={item._id}>Delete</button>
              </div>
            )}
          })}
        </>)}      
  </div> 
  ):
  <EditOption setEditOption = {setEditOption} editID = {editID} editOption={editOption} setHandlerVal={setHandlerVal}/>
  )}
  
export default TaskManager;