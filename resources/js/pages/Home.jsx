import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const Home = () => {
	const user = localStorage.getItem("username")

	return (
		<section className="section">
			<div className="container">
				<h1 className="title">
					Bienvenue { user }
				</h1>
				<p className="subtitle">
					My first website with <strong>Bulma</strong>!
				</p>
			</div>
		</section>
	);
};

export default Home;