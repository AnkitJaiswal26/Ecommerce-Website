import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import store from "../store";
import { Container, Typography, Button, TextField } from "@material-ui/core/";
import { register } from "../actions/auth.actions";

const styles = {
	main_container: {
		padding: "0%",
		backgroundColor: "aliceblue",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		margin: "0%",
		height: "100vh",
		width: "100%",
	},
	typography_heading: {
		paddingTop: "10%",
		marginLeft: "15%",
	},

	textFields: {
		marginTop: "10%",
		marginBottom: "25px",
		width: "50%",
	},
};

const Register = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [loggedIn, setLoggedIn] = useState(false);
	const state = store.getState();

	const checkAuth = () => {
		state.auth.token ? setLoggedIn(true) : setLoggedIn(false);
	};

	const routeChange = () => {
		let path = `productIndex`;
		history.push(path);
	};

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
        if(error) 
		setError(state.auth.error);
		setMessage(state.auth.message);
	}, [state.auth.error, state.auth.message]);

	const signUp = (username, email, password) => {
		dispatch(
			register({
				username: username,
				email: email,
				password: password,
			})
		);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		try {
			setError("");
			signUp(username, email, password);
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div>
			{checkAuth() ? <Redirect to="/login" /> : null}
			<div style={styles.main_container}>
				<Container>
					<Typography
						variant="h5"
						component="h5"
						style={styles.typography_heading}
					>
						Open the door to the homemade, machine-free and
						eco-friendly luxury
					</Typography>
				</Container>
				<TextField
					label="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					style={styles.textFields}
				/>
				<TextField
					label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					style={styles.textFields}
				/>
				<TextField
					label="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					style={styles.textFields}
				/>
				<Button variant="outlined" onClick={onSubmit}>
					Sign Me Up!
				</Button>
				<Link
					to={"/login"}
					style={{ textDecoration: "none", marginTop: "25px" }}
				>
					Already have an Account
				</Link>
			</div>
		</div>
	);
};

export default Register;
