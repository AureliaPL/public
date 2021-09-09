import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const Home = () => {
    let [user_info, setUserInfo] = useState([])
    let [isFetched, setFetch] = useState(false)
	const id = localStorage.getItem("token")
	const user = localStorage.getItem("username")

	const fetchData = async () => await axios.get('https://api.betaseries.com/members/infos', {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${id}`,
			"Accept": "application/json"
		}
	}).
	then((res) => {
		setUserInfo(res.data)
		setFetch(true)
	})

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

	return (
		<section className="section">
			<div className="container">
				{localStorage.token ?
					<h1 className="title">
						Accueil {localStorage.token}
					</h1>
				:
					<>
						<h1 className="title">Vous n'êtes pas connecté.e</h1>
						<a href="https://www.betaseries.com/authorize?client_id=27e640f20736&redirect_uri=http://localhost:8000/login" className="button navbar-item has-background-danger-dark has-text-white">Login</a>
					</>
				}
			</div>
		</section>
	);
};

export default Home;