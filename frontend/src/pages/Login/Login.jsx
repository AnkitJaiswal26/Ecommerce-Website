import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import styles from "./Login.module.css";
import { useHistory } from "react-router";
import { isAuth, login } from "../../actions/auth.actions";
import BharatKaSparsh from "../../images/BharatKaSparsh.jpg";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const logIn = async (email, password) => {
    await dispatch(
      login(
        {
          email: email,
          password: password,
        },
        history
      )
    );
    // window.location.reload();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      logIn(email, password);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer />
      <div
        className={`w-full h-screen flex justify-center items-center ${styles.wrapper}`}
      >
        <div className={`${styles.mainContainer}`}>
          <div className={`${styles.contentBox}`}>
			<h2>BharatKaSparsh</h2>
			<img src={BharatKaSparsh}></img>
		  </div>
          <div className={`${styles.formBox}`}>
            <form onSubmit={onSubmit}>
              <h2 className={`${styles.heading}`}>Login</h2>

              <div className={`${styles.inputContainer}`}>
                <label className={`${styles.inputLabel}`}>Email</label>
                <input
                  className={`w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className={`${styles.inputContainer}`}>
                <label className={`${styles.inputLabel}`}>Password</label>
                <input
                  className={`w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className={`flex flex-row-reverse`}>
                <Link to={"/forgotPassword"} className={`${styles.forgot}`}>
                  Forgot Password?
                </Link>
              </div>
              <div className="flex flex-col items-center">
                <a
                  className={` w-full font-semibold shadow-sm rounded-lg py-3 bg-indigo-400 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-indigo-600 focus:shadow-sm focus:shadow-outline mt-5`}
                  onClick={onSubmit}
                  href="/"
                >
                  <span className="ml-4">Log In</span>
                </a>
              </div>
            </form>
            <div>
              <h6 className={`${styles.already}`}>
                Don't have an Account?
                <Link className={`${styles.alreadyLink}`} to={`/register`}>
                  {" "}
                  Register
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
