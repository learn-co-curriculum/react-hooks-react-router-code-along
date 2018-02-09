import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <form>
        <div>
          <input type="text" name="username" placeholder="Username" />
          <label htmlFor="username">Username</label>
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" />
          <label htmlFor="password">Password</label>
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};



const About = () => {
  return (
    <div>
      <h1>This is my about component!</h1>
    </div>
  );
};

class Home extends React.Component {
  render() {
    return <h1>Home!</h1>;
  }
}

// Step 2. Changed to have router coordinate what is displayed
ReactDOM.render((
  <Router>
    <div>
      <Route path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
    </div>
  </Router>),
  document.getElementById('root')
);
