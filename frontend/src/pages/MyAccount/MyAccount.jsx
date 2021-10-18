import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import store from "../../store/index";
import { useSelector } from "react-redux";
import { getItems } from "../../actions/products.action";
import { isAuth } from "../../actions/auth.actions";
import Topbar from "../../components/Topbar/Topbar";
import styles from "./MyAccount.module.css";

const MyAccount = () => {

	return (
		<>
			{isAuth() === false ? <Redirect to="/login" /> : null}
			<ToastContainer />
			<Topbar />
			<div>
                <section class="sidebar_account" className={`${styles.sidebar_account}`}>
                    <nav>
                        <a href="" class="current" className={`${styles.current}`}>My Profile</a><br/>
                        <a href="">My Orders</a><br/>
                        <a href="">Addresses</a><br/>
                        <a href="">Settings and Preferences</a><br/>
                        <a href="" class="logout" className={`${styles.logout}`}>Logout</a>
                    </nav>
                </section>
                <section class="profile" className={`${styles.profile}`}>
                    <div>
                        <h3>Username</h3>
                        <input type="text" id="username" placeholder="Username" value="resh_test" readOnly></input>
                    </div>
                    <br/>
                    <div>
                        <h3>Email</h3>
                        <form>
                            <input type="text" id="email" placeholder="Email ID" defaultValue="resh_testing@gmail.com"></input>
                            <input type="submit" value="Update Email Address"></input>
                        </form>
                    </div>
                    <br/>
                    <div>
                        <h3>Change Password</h3>
                        <form>
                            <input type="password" id="old_password" placeholder="Old Password"></input>
                            <br/>
                            <input type="password" id="new_password1" placeholder="New Password"></input>
                            <br/>
                            <input type="password" id="new_password2" placeholder="Confirm New Password"></input>
                            <br/>
                            <input type="submit" value="Change Password"></input>
                        </form>
                    </div>
                    <br/>
                    <div>
                        <h3>Role</h3>
                        <input type="text" id="role" placeholder="Role" value="Customer" readOnly></input>
                    </div>
                </section>
            </div>
		</>
	);
};

export default MyAccount;
