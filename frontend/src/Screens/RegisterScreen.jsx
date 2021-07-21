import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import store from '../store'
import { Container, Typography, Button, TextField } from "@material-ui/core/";
import { register } from '../actions/auth.actions';
import {useDispatch} from 'react-redux'

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
    // console.log(state);
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false);
    const state = store.getState();
    const dispatch = useDispatch();


    const checkAuth = () => {
        console.log("Auth checked")
        if (state.auth.token !== null) {
            setLoggedIn(true)
        }
    }

    const routeChange = () => {
        let path = `productIndex`;
        history.push(path);
    };


    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [errorOccurred, setErrorOccurred] = useState(false);
   
    const handleChangeEmail = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    };
    const handleChangeUsername = (e) => {
        console.log(e.target.value);
        setUsername(e.target.value);
    };
    const handleChangePwd = (e) => {
        console.log(e.target.value);
        setPwd(e.target.value);
    };

    const signUp = async(username, email, password) => {
        //TODO: IMPLEMENT REGISTER
        const res = await dispatch(register({
            "username":username,
            "email":email,
            "password": password,
        }));
        console.log(res)
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            setError("");
            setErrorOccurred(false);
            await signUp(username, email, pwd);
            console.log("Signed up!");
            routeChange();
        } catch (error) {
            alert("Error Occurred!")
            setErrorOccurred(true);
            setError(error);
        }
    };

    return (
        <div>
            {checkAuth()}
            {loggedIn ? history.push('/productIndex') :
                <div style={styles.main_container}>
                    <Container>
                        <Typography
                            variant="h5"
                            component="h5"
                            style={styles.typography_heading}
                        >
                            Open the door to the homemade, machine-free and eco-friendly luxury
                        </Typography>
                    </Container>
                    {errorOccurred && <p style={{ color: 'red' }}>Could not sign in</p>}
                    <TextField
                        label="Username"
                        value={username}
                        onChange={handleChangeUsername}
                        type="text"
                        style={styles.textFields}
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={handleChangeEmail}
                        type="email"
                        style={styles.textFields}
                    />
                    <TextField
                        label="Password"
                        value={pwd}
                        onChange={handleChangePwd}
                        type="password"
                        style={styles.textFields}
                    />
                    <Button variant="outlined" onClick={onSubmit}>Sign Me Up!</Button>
                    {/* <Button onClick={history.push('/signin')}>Already Have An Account</Button> */}
                    <Link to={'/login'} style={{ textDecoration: 'none', marginTop: '25px' }}>Already have an Account</Link>
                </div>

            }
        </div>
    )
}

export default Register
