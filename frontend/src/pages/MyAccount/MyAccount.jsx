import React from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { isAuth, updateEmail } from "../../actions/auth.actions";
import Topbar from "../../components/Topbar/Topbar";
import "./MyAccount.scss";
import axios from "../../helpers/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

const MyAccount = (props) => {
	const user = JSON.parse(localStorage.getItem("user"));
	const usern = user.username;
	const role = user.role;
	const email = user.email;

	const dispatch = useDispatch();

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [newEmail, setNewEmail] = useState(email);

	const handleUpdatedPassword = async (e) => {
		e.preventDefault();
		if (newPassword === "" || oldPassword === "") {
			toast.error("Password is required!");
		} else if (newPassword !== confirmPassword) {
			toast.error("Confirm password must be equal to password");
		} else {
			await axios
				.put("/users/updatePassword", {
					oldPassword,
					newPassword,
				})
				.then((res) => {
					toast.success(res.data.message);
				})
				.catch((err) => {
					toast.error(err.response.data.error);
				});
		}
	};

	const handleUpdatedEmail = async (e) => {
		e.preventDefault();
		if (newEmail) await dispatch(updateEmail(newEmail));
		else toast.error("Email cannot be empty!");
	};

	return (
		<>
			{isAuth() === false ? <Redirect to="/login" /> : null}
			<ToastContainer />
			<Topbar {...props} />
			<div>
				<section className="profileContainer">
					<div className="innerContainer">
						<div className="inputContainer">
							<label className="inputLabel">Username</label>
							<input
								type="text"
								id="username"
								className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
								placeholder="Username"
								value={usern}
								readOnly
							></input>
						</div>
						<div className="emailContainer">
							<form onSubmit={(e) => handleUpdatedEmail(e)}>
								<div className="inputContainer">
									<label className="inputLabel">Email</label>
									<input
										type="text"
										id="email"
										placeholder="Email ID"
										defaultValue={email}
										onChange={(e) =>
											setNewEmail(e.target.value)
										}
										className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
									/>
								</div>
								<div className="inputContainer">
									<input
										className="submit w-full px-5 py-2 font-medium shadow-sm sm:rounded-md text-sm bg-indigo-400 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-indigo-600 focus:shadow-sm focus:shadow-outline"
										type="submit"
										value="Update Email Address"
									/>
								</div>
							</form>
						</div>
					</div>
					<div
						className="innerContainer"
						style={{ flexDirection: "column" }}
					>
						<h3>Change Password</h3>
						<form
							onSubmit={(e) => {
								handleUpdatedPassword(e);
							}}
						>
							<div
								className="inputContainer"
								style={{
									marginLeft: "0",
								}}
							>
								<label className="inputLabel">
									Old Password
								</label>
								<input
									type="password"
									id="old_password"
									placeholder="Old Password"
									onChange={(e) =>
										setOldPassword(e.target.value)
									}
									className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
								/>
							</div>
							<div className="inputContainer">
								<label className="inputLabel">
									New Password
								</label>
								<input
									type="password"
									onChange={(e) =>
										setNewPassword(e.target.value)
									}
									id="new_password1"
									placeholder="New Password"
									className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
								/>
							</div>
							<div className="inputContainer">
								<label className="inputLabel">
									Confirm New Password
								</label>
								<input
									type="password"
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
									id="new_password2"
									className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
									placeholder="Confirm New Password"
								/>
							</div>
							<div className="inputContainer">
								<input
									type="submit"
									value="Change Password"
									className="submit w-full px-5 py-2 font-medium shadow-sm sm:rounded-md text-sm bg-indigo-400 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-indigo-600 focus:shadow-sm focus:shadow-outline"
								/>
							</div>
						</form>
					</div>
					<div className="innerContainer">
						<div className="inputContainer">
							<label className="inputLabel">Role</label>
							<input
								type="text"
								className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
								id="role"
								placeholder="Role"
								value={role}
								readOnly
							/>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default MyAccount;
