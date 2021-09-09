import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    let [isActive, setisActive] = useState(false);
    let [isFetched, setFetch] = useState(false);

    let id = localStorage.getItem("token");

	const fetchData = async () => await axios.get('https://api.betaseries.com/members/infos', {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${id}`,
			"Accept": "application/json"
		}
	})
    .then(() => {
		setFetch(true)
	})

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [localStorage.getItem('token')])

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
                    <Link
                        to="/"
                        className="navbar-item has-text-white"
                        onClick={() => {
                        setisActive(!isActive);
                        }}>
                        Test
                    </Link>
                </div>
                <div className="navbar-end">
                    {isFetched ?
                        <Link
                            to="/" 
                            onClick={() => {
                            localStorage.removeItem('token');
                            setFetch(false);
                            setisActive(!isActive);
                            }}
                            className="button navbar-item">
                            Logout
                        </Link>
                    :
                        <a href="https://www.betaseries.com/authorize?client_id=27e640f20736&redirect_uri=http://localhost:8000/login" className="button navbar-item">Login</a>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;