import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import ShowCard from '../components/ShowCard';

const Home = () => {
    let [shows, setShows] = useState([])
    let [isFetched, setFetch] = useState(false)
	const id = localStorage.getItem("token")
	const user = localStorage.getItem("username")

	const fetchData = async () => await axios.get('https://api.betaseries.com/shows/list?limit=50&order=popularity', {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${id}`,
			"Accept": "application/json"
		},
	}).
	then((res) => {
		setShows(res.data.shows)
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
					<>
						<center>
							<h1 className="title">
								Accueil
							</h1>
							<hr className="has-background-danger-dark" />
							{isFetched ?
								shows.map((show) => (
									<ShowCard key={show.id} show={show}/>
								))
							:
								<h1>Loading...</h1>
							}
						</center>
					</>
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