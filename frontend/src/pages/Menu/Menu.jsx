import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import store from "../../store/index";

const Menu = () => {
    const history = useHistory();
    const state = store.getState();
    const routeChange = (path) => {
        history.push(path);
    }

    useEffect(() => {
        console.log(state.auth.user.email);
    }, [state])
    console.log(state)
    return (
        <div>
            <h1>Menu</h1>
        </div>
    )
}

export default Menu
