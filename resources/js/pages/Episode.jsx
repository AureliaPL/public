import React, { useEffect, useState } from 'react';
import {Link, Redirect, useParams} from "react-router-dom";
import axios from 'axios';

const Episode = () => {
    let [isFetched, setFetch] = useState(false);
    let [episode, setEpisode] = useState([]);
    let [image, setImage] = useState('');
    const {id} = useParams();
	const userId = localStorage.getItem("token");

    const fetchData = async () => await axios.get(`https://api.betaseries.com/episodes/display?id=${id}`, {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${userId}`,
			"Accept": "application/json"
		}
    })
    .then((res) => {
        setEpisode(res.data.episode);
    })
    .finally(() => {
        setFetch(true);
    })

    useEffect(() => {
        fetchData();
    }, [])

    return (
		<section className="section">
            <div className="container">
                {localStorage.token ?
                    <>
                        {isFetched ?
                            <div className="card has-background-danger-dark has-text-white">
                                <Link to={`/show/${episode.show.id}`} className="button has-background-danger-dark has-text-white is-ghost has-text-weight-bold p-4">&#8592;</Link>
                                <div className="media">
                                    <figure className="card-image media-right">
                                        <img src={`https://api.betaseries.com/pictures/episodes?id=${id}&key=27e640f20736&token=${userId}`} className="image p-4" width="200rem"></img>
                                    </figure>
                                    <div className="card-content">
                                        <h1><strong className="has-text-white title">{episode.code}: {episode.title}</strong></h1>
                                        <br/>
                                        <p className="mx-1">Date de diffusion: {episode.date}</p>
                                        <p className="mx-1">Note: {(Math.round(episode.note.mean*10)/10)}</p>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <p className="mx-1">Description:</p>
                                    <p className="has-text-white has-text-weight-semibold mx-2">{episode.description}</p>
                                </div>
                            </div>
                        :
                            <progress className="progress is-danger" >Loading...</progress>
                        }
                    </>
                :
                    <Redirect to="/"/>
                }
            </div>
        </section>

    )
}

export default Episode