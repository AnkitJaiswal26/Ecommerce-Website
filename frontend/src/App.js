import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Menu from "./pages/Menu/Menu";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing"
// import { Menu } from "@material-ui/core";

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/productIndex">
						<Menu />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/">
						<Landing />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
