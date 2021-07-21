import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <nav>
            <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/login">Login</Link>
                </li>
                <li>
                <Link to="/register">Register</Link>
                </li>
            </ul>
            </nav>
        </div>
    )
}

export default Landing
