import React, { useEffect, useState } from 'react';
import {Link, Redirect, useParams} from "react-router-dom";
import axios from 'axios';
import EpisodeCard from '../components/EpisodeCard';

const Show = () => {
    let [isFetched, setFetch] = useState(false);
    let [hasShow, setHasShow] = useState(false);
    let [archived, setArchive] = useState(false);
    let [show, setShow] = useState([]);
    let [episodes, setEpisodes] = useState([]);
    let [seasonId, setSeason] = useState(1);
    const {id} = useParams();
	const userId = localStorage.getItem("token");

	const addShow = async () => await axios.post(`https://api.betaseries.com/shows/show`, {
        'id': show.id
    }, {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${userId}`,
			"Accept": "application/json"
		}
	})
    .then(() => {
        setHasShow(true);
    })

	const addArchive = async () => await axios.post(`https://api.betaseries.com/shows/archive`, {
        'id': show.id
    }, {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${userId}`,
			"Accept": "application/json"
		}
	})
    .then(() => {
        setArchive(true);
    })

	const rmArchive = async () => await axios.delete(`https://api.betaseries.com/shows/archive?id=${id}`, {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${userId}`,
			"Accept": "application/json"
		}
	})
    .then(() => {
        setArchive(false);
    })

    const getEpisodes = async () => await axios.get(`https://api.betaseries.com/shows/episodes?id=${id}&season=${seasonId}`, {
        "headers": {
            "X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${userId}`,
			"Accept": "application/json"
        }
    })
    .then((res) => {
        setEpisodes(res.data.episodes);
    })

	const fetchData = async () => await axios.get(`https://api.betaseries.com/shows/display?id=${id}`, {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${userId}`,
			"Accept": "application/json"
		},
	})
	.then((res) => {
		setShow(res.data.show)
        if(res.data.show.user.next.id) {
            setHasShow(true);
        }
        if(res.data.show.user.archived) {
            setArchive(true);
        }
	})
    .finally(() => {
		setFetch(true)
    })

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        getEpisodes();
    }, [seasonId])

    return(
		<section className="section">
            <div className="container">
                {localStorage.token ?
                    <>
                        {isFetched ?
                            <div className="card">
                                {show.images.banner &&
                                    <figure className="card-image">
                                        <img src={show.images.banner} width="100%" className="image"></img>
                                    </figure>
                                }
                                <div className="card-content has-background-danger-dark px-6">
                                    <h1><strong className="has-text-white title">{show.title}</strong></h1>
                                    <br/>
                                    <div className="mx-3">
                                        <p className="has-text-white">Saisons: {show.seasons}</p>
                                        <p className="has-text-white">Episodes: {show.episodes}</p>
                                        <p className="has-text-white">Durée: {show.length}min</p>
                                        <p className="has-text-white">Genres: {Object.keys(show.genres).map((genre) => 
                                            <span key={genre}>{genre} </span>
                                        )}</p>
                                        <p className="has-text-white">Note: {(Math.round(show.notes.mean*10)/10)}</p>
                                        <br/>
                                        <div className="has-text-white has-text-weight-semibold">
                                            <p>Description: {show.description}</p>
                                            <br/>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="has-text-white">Liste des épisodes</h1>
                                        <br/>
                                        <div className="select">
                                            <select onChange={e => setSeason(e.currentTarget.value)}>
                                                {Array.apply(null, {length: show.seasons}).map((e, saison) =>
                                                    <option key={saison + 1} value={saison + 1}>Saison {saison + 1}</option>
                                                )}
                                            </select>
                                        </div>
                                        <br/><br/>
                                        <div>
                                            {episodes.map((episode) =>
                                                <div key={episode.id}>
                                                    <EpisodeCard episode={episode}/>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <br/>
                                    {hasShow ?
                                        <>
                                            <p>{archived}</p>
                                            {archived ?
                                                <button className="button" onClick={() => {rmArchive()}}>Désarchiver la série</button>
                                            :
                                                <button className="button" onClick={() => {addArchive()}}>Archiver la série</button>
                                            }
                                        </>
                                    :
                                        <button className="button has-background-success has-text-white" onClick={() => {addShow()}}>Ajouter à mes séries</button>
                                    }
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
    );
}

export default Show;