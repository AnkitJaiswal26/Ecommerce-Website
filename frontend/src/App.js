import "./App.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";

import Register from "./Screens/RegisterScreen"
import Login from "./Screens/LoginScreen"
import Home from "./Screens/HomeScreen"
import { render } from "react-dom";

function App() {
	return (
	<Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
	);
}

export default App;
