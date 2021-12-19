import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import './App.css';
import Login from "./Auth/login";
import Register from "./Auth/register";
import Admins from "./Core/Admins/Admins";
import Home from "./Core/Home/home";
import Posts from "./Core/Posts/Posts";
import Users from "./Core/Users/Users";
import Jobs from "./Core/jobs/jobs";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  return (
    <div className="App">
  <Router>
    <Switch>
      <Route path="/login" exact component={Login}/>
      <Redirect  exact from="/" to= "/home"/>
      <PrivateRoute path="/home" exact component={Home}/>
      <PrivateRoute path="/posts" exact component={Posts}/>
      <PrivateRoute path="/users" exact component={Users}/>
      <PrivateRoute path="/Jobs" exact component={Jobs} />
      <PrivateRoute path="/register" exact component={Register}/>
      <PrivateRoute path="/admins" exact component={Admins}/>
    </Switch>
  </Router>
    </div>
  );
}

export default App;
