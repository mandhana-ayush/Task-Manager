import {Link} from 'react-router-dom'
import {useState, useEffect, useRef} from 'react';
import TaskManager from './TaskManager';


const Login = ()=>{
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const usernameContainer = useRef(null);
  const passwordContainer = useRef(null);


  const [boole, setBoole] = useState(false);
  const [task_display, setTask_display] = useState(false);

  const [data, setData] = useState({});

  useEffect(()=>{
    
    if(boole){
      
      fetch(`http://localhost:5000/login?user=${usernameContainer.current.value}&pass=${passwordContainer.current.value}`)
      .then(resp=>resp.json())
      .then((data)=>{
        if(data.msg){
          alert(`${data.msg}`);
        }
        else{
          setTask_display(true);
         
          setData(data);
        }
      });
    }

    usernameContainer.current.value='';
    passwordContainer.current.value='';

    setBoole(false);

  },[boole]);

  return (
  !task_display? (<div className="main_folder">
      <div className="link">
        <Link to="/" >
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>
      </div>
      <form className="loginForm" onSubmit={(e)=>{
        e.preventDefault();
        setBoole(true);
        
      }}>
      <label htmlFor="user">UserName:</label>
      <input 
      type="text" 
      name="username" 
      id="user" 
      placeholder="Enter Your UserName" 
      autoComplete="off"
      ref={usernameContainer} 
      />

      <label htmlFor="password">Password:</label>
      <input 
      type="password" 
      name="password" 
      id="password" 
      placeholder="Enter Your Password" 
      ref={passwordContainer}
      />

      <button type="submit" className="submit_btn">Submit</button>
      </form>
    </div>):
    (
      <TaskManager data = {data}/>
    )
  )
}

export default Login;