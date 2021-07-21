import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Activation from "./pages/Activation/Activation";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Menu from './pages/Menu/Menu';

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path="/productIndex">
						<Menu />
					</Route>
					<Route
						path="/login"
						exact
						render={(props) => <Login {...props} />}
					/>
					<Route
						path="/users/activate/:token"
						exact
						render={(props) => <Activation {...props} />}
					/>
					<Route
						path="/forgotPassword"
						exact
						render={(props) => <ForgotPassword {...props} />}
					/>
					<Route
						path="/users/password/reset/:token"
						exact
						render={(props) => <ResetPassword {...props} />}
					/>
					<Route path="/register" exact>
						<Register />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
