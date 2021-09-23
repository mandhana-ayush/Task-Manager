import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'


function Register() {
 
  const [boole, setBoole] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(boole){
      const user = {
        username:username,
        password:password
      }
  
      const options ={ 
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }
  
      fetch('http://localhost:5000/register', options)
      .then(resp=>resp.json())
      .then(value=>{
        // setData(value);
        // setRes_display(true);

        alert(value.msg)
      })

      setUsername('');
      setPassword('');
    }
  }, [boole])
  

  return (
    <div>
      <Link to="/">
        Login
      </Link>

      <Link to="/register">
        Register
      </Link>
      <form onSubmit={(e)=>{
        e.preventDefault();
        setBoole(true)}}>
        <label htmlFor="username">UserName: </label>
        <input type="text" name="username" placeholder="Enter a username" id="username" autoComplete="off" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>

        <label htmlFor="password">Password: </label>
        <input type="password" name="password" placeholder="Enter a password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        
        <button type="submit">Submit</button>
      </form>
      
      
    </div>
  )
}

export default Register
