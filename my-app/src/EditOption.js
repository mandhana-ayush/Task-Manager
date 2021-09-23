import React, { useState, useEffect} from 'react';

const EditOption= ({setEditOption , editID, editOption, setHandlerVal})=>{
  const [taskInfo, setTaskInfo] = useState({});

  const [taskInfoDone, setTaskInfoDone] = useState(false);
  const [finalUpdate, setFinalUpdate] = useState(false);
  
  const [name, setName] = useState('');

  const submitHandler = (e)=>{
    e.preventDefault();
    setFinalUpdate(true);
  }

  useEffect(()=>{
    fetch(`http://localhost:5000/api/v1/task/${editID}`)
    .then(resp=>resp.json())
    .then(data=>{
      setTaskInfo(data);
      setName(data.task_name);
      setTaskInfoDone(true);
    })
  },[])

  useEffect(()=>{
    if(finalUpdate){
      let domNew;
      const newDom = document.querySelectorAll("input[name='comp']");
      for(let i=0;i<newDom.length;i++){
        if(newDom[i].checked){
          domNew = newDom[i].value === 'true'?true: false;
        }
      }
      const data = {
        task_name: name, 
        isCompleted: domNew
      }

      const options = {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      
      fetch(`http://localhost:5000/api/v1/task/${editID}`, options)
      .then(resp=>resp.json())
      .then(data=>{
        setHandlerVal(false);
        setEditOption(false);
      });
    }
  },[finalUpdate]);

  return (
    taskInfoDone && (
      <div className="edit_container">
        <form className="edit_form" onSubmit={submitHandler}>
          <label htmlFor="task_id" className="task_id_label">TaskID:</label>
          <input 
          type="text" 
          name="task_id" 
          id="task_id" 
          disabled={true}  
          value={taskInfo._id}
          />
          <label htmlFor="task_name" className="task_name_label">TaskName:</label>
          <input 
          type="text" 
          name="name" 
          id="task_name" 
          value={name} 
          onChange={(e)=>{
            setName(e.target.value);
          }}
          />
          <div className="isCompleted" > 
                <input type="radio" name="comp" id="comp_true" value="true" className="comp" />
                <label htmlFor="comp_true">True</label>

                <input type="radio" name="comp" id="comp_false" value="false"  className="comp"/>
                <label htmlFor="comp_false">False</label>
          </div>
          <button type="submit" className="editTask_btn">Edit Task</button>
        </form>

        <button type="button" className="prev_btn" onClick={()=>{
          setEditOption(false);
          setHandlerVal(false);
        }}>Back To Tasks</button>
      </div>
      ))}

export default EditOption;