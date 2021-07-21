import { React, useState } from "react";
import { Container, Typography, Button, TextField } from "@material-ui/core/";
// import {useAuth} from '../../AuthContext';
import { useHistory } from "react-router-dom";
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

const Login = () => {
  const history = useHistory();

  const routeChange = () => {
    let path = `dashboard`;
    history.push(path);
  };

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [errorOccurred, setErrorOccurred] = useState(false);

  const handleChangeEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleChangePwd = (e) => {
    console.log(e.target.value);
    setPwd(e.target.value);
  };

  const signIn = (email, pwd) => {
    //TODO: IMPLEMENT SIGNIN
  };
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      setError("");
      setErrorOccurred(false);
      const e = signIn(email, pwd);
      console.log("Signed in!");
      console.log(e);
      if (e == null) {
        routeChange();
      }
    } catch (error) {
      alert("Error Occurred!");
      console.log(error);
      setErrorOccurred(true);
      setError(error);
    }
  };

  return (
    <div style={styles.main_container}>
      <Container>
        <Typography
          variant="h5"
          component="h5"
          style={styles.typography_heading}
        >
          Just one step remains to Open the door to the homemade, machine-free and eco-friendly luxury
        </Typography>
      </Container>
      {errorOccurred && <p style={{ color: "red" }}>Could not sign in</p>}
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
      <Button variant="outlined" onClick={onSubmit}>
        Sign Me In!
      </Button>
    </div>
  );
};

export default Login;
