import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return(
        <nav className="navbar has-background-danger-dark">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item has-text-white"><strong>Previously On</strong></Link>
                <Link to="/" className="navbar-item has-text-white">Test</Link>
            </div>
        </nav>
    )
}

export default Navbar;