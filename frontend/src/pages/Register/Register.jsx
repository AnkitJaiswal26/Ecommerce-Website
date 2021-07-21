import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import styles from './Register.module.css'
import store from "../../store";
import { Container, Typography, Button, TextField } from "@material-ui/core/";
import { isAuth, register } from "../../actions/auth.actions";

// const styles = {
// 	main_container: {
// 		padding: "0%",
// 		backgroundColor: "aliceblue",
// 		display: "flex",
// 		alignItems: "center",
// 		flexDirection: "column",
// 		margin: "0%",
// 		height: "100vh",
// 		width: "100%",
// 	},
// 	typography_heading: {
// 		paddingTop: "10%",
// 		marginLeft: "15%",
// 	},

// 	textFields: {
// 		marginTop: "10%",
// 		marginBottom: "25px",
// 		width: "50%",
// 	},
// };

const Register = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const state = store.getState();

	const routeChange = () => {
		let path = `login`;
		history.push(path);
	};

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		setError(store.getState().auth.error);
		setMessage(store.getState().auth.message);

		if (message) toast.success(message);
		if (store.getState().auth.error) toast.error(error);
        // eslint-disable-next-line
	}, [window.store.getState().auth]);

	const signUp = async (username, email, password) => {
		await dispatch(
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
		<>
			{isAuth() ? <Redirect to="/productIndex" /> : null}
			<ToastContainer />
            <div className={`w-full h-screen flex justify-center items-center ${styles.wrapper}`}>
                <div className={`${styles.mainContainer}`}>
                    <div className={`${styles.contentBox}`}></div>
                    <div className={`${styles.formBox}`}></div>
                </div>
            </div>

			{/* <div style={styles.main_container}>
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
			</div> */}
		</>
	);
};

export default Register;