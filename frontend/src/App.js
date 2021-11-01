import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Activation from "./pages/Activation/Activation";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Menu from "./pages/Menu/Menu";
import Product from "./pages/Product/Product";
import MyAccount from "./pages/MyAccount/MyAccount";
import MyOrders from "./pages/MyOrders/MyOrders";
import Cart from "./pages/Cart/Cart";
import Success from "./pages/Success/Success";

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route
						path="/"
						exact
						render={(props) => <Menu {...props} />}
					/>
					<Route
						path="/login"
						exact
						render={(props) => <Login {...props} />}
					/>
					<Route
						path="/account"
						exact
						render={(props) => <MyAccount {...props} />}
					/>
					<Route
						path="/myorders"
						exact
						render={(props) => <MyOrders {...props} />}
					/>
					<Route
						path="/product/:categorySlug/:productSlug"
						exact
						render={(props) => <Product {...props} />}
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
					<Route
						path="/success"
						exact
						render={(props) => <Success {...props} />}
					/>
					<Route
						path="/products/:slug"
						exact
						render={(props) => <Product {...props} />}
					/>
					<Route path="/register" exact>
						<Register />
					</Route>
					<Route
						path="/cart"
						exact
						render={(props) => <Cart {...props} />}
					/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
