import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import store from "../../store/index";
import {useSelector} from 'react-redux'

const Menu = () => {
    const data = useSelector((state) => state.auth);
    const history = useHistory();
    // const state = store.getState();
    const routeChange = (path) => {
        history.push(path);
    }

    useEffect(() => {
        console.log(data);
    }, [data])

    useEffect(() => {
        console.log("Hello")
        console.log(data)
        
    }, [data])
    // console.log(state)
    return (
        <div>
            <h1>Menu</h1>
        </div>
    )
}

export default Menu
