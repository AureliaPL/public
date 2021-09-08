import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    const [isActive, setisActive] = React.useState(false);

    return(
        <nav className="navbar has-background-danger-dark">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item has-text-white"><strong>Previously On</strong></Link>

                <a 
                    onClick={() => {
                    setisActive(!isActive);
                    }}
                    role="button"
                    className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample">
                    <span aria-hidden="true" className="has-text-white"></span>
                    <span aria-hidden="true" className="has-text-white"></span>
                    <span aria-hidden="true" className="has-text-white"></span>
                </a>
            </div>
            <div id="navbarBasicExample" className={`navbar-menu has-background-danger-dark ${isActive ? "is-active" : ""}`}>
                <div className="navbar-start">
                    <Link to="/" className="navbar-item has-text-white">Test</Link>
                </div>
                <div className="navbar-end">
                    <Link to="/" className="button navbar-item">Login</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;