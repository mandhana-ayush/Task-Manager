import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <Router>
      <Switch>
      
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/" >
          <Login/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
