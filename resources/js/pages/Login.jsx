import React, {useEffect, useState} from 'react';
import {Redirect, useHistory, useLocation} from "react-router-dom";
import axios from "axios";

const Login = () => {
    let [info, setInfo] = useState([])
    let [isFetched, setFetch] = useState(false)
	let [redirect, setRedirect] = useState(false)

	const params = useLocation().search
	const code = new URLSearchParams(params).get('code')
    const fetchData = async () => await axios.post(`https://api.betaseries.com/oauth/access_token`, {
        headers: 'Access-Control-Allow-Origin',
        client_id: '27e640f20736',
		client_secret: 'a2ce2620e77cde1502ce11661977df8d',
		redirect_uri: 'http://localhost:8000/login',
		code: code
    })
    .then((res) => {
		localStorage.setItem("token", res.data.access_token)
    })
	.finally(() => {
		const id = localStorage.getItem("token")
	
		axios.get('https://api.betaseries.com/members/infos', {
			"headers": {
				"X-BetaSeries-Key": "27e640f20736",
				"Authorization": `Bearer ${id}`,
				"Accept": "application/json"
			}
		}).
		then((res) => {
			setInfo(res.data.member)
			localStorage.setItem("username", res.data.member.login)
			setFetch(true)
		})
		.finally(() => {
			setTimeout(function() {
				setRedirect(true)
			}.bind(this), 3000)
		})
	})

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

	return (
		<section className="section">
			{ isFetched ?
				<div className="container">
					<h1 className="title">
						Bienvenue {info.login}
					</h1>
				</div>
			: 
				""
			}
			{!redirect ?
				""
			:
				<Redirect to="/"/>
			}
		</section>
	);
};

export default Login;