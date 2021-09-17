import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    let [isActive, setisActive] = useState(false);
    let [isFetched, setFetch] = useState(false);
    let [user, setUser] = useState([]);

    let id = localStorage.getItem("token");

	const fetchData = async () => await axios.get('https://api.betaseries.com/members/infos', {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${id}`,
			"Accept": "application/json"
		}
	})
    .then((res) => {
        setUser(res.data.member);
		setFetch(true);
	})

    useEffect(() => {
        fetchData();
    }, [localStorage.token])

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
                <div className="navbar-start ml-4">
                    <Link
                        to="/"
                        className="navbar-item has-background-danger-dark has-text-white"
                        onClick={() => {
                        setisActive(!isActive);
                        }}>
                        Accueil
                    </Link>
                    <Link
                        to="/friends"
                        className="navbar-item has-background-danger-dark has-text-white"
                        onClick={() => {
                        setisActive(!isActive);
                        }}>
                        Amis
                    </Link>
                </div>
                <div className="navbar-end m-4">
                    <Link
                        to={`/user/${user.id}`}
                        onClick={() => {
                        setisActive(!isActive);
                        }}
                        className="navbar-item has-background-danger-dark has-text-white m-1">
                        {localStorage.username}
                    </Link>
                    {isFetched ?
                        <Link
                            to="/" 
                            onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('username');
                            setFetch(false);
                            setisActive(!isActive);
                            }}
                            className="button navbar-item m-1">
                            Logout
                        </Link>
                    :
                        <a href="https://www.betaseries.com/authorize?client_id=27e640f20736&redirect_uri=http://localhost:8000/login" className="button navbar-item m-1">Login</a>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;