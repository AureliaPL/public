import React, { useEffect, useState } from 'react';
import {Link, Redirect, useParams} from "react-router-dom";
import axios from 'axios';

const User = () => {
    let [isFetched, setFetch] = useState(false);
    let [user, setUser] = useState([]);
    const {id} = useParams();
	const userId = localStorage.getItem("token");

	const fetchData = async () => await axios.get(`https://api.betaseries.com/members/infos?id=${id}`, {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${userId}`,
			"Accept": "application/json"
		}
	})
    .then((res) => {
        setUser(res.data.member);
	})
    .finally(() => {
		setFetch(true);
    })

    useEffect(() => {
        fetchData();
    }, [id])

    return(
		<section className="section">
            <div className="container">
                {localStorage.token ?
                    <>
                        {isFetched ?
                            <>
                                <div className="card has-background-danger-dark">
                                    {user.profile_banner &&
                                        <>
                                            <figure className="card-image">
                                                <img src={user.profile_banner} className="image"></img>
                                            </figure>
                                        </>
                                    }
                                    <div className="media m-3 ml-6">
                                        <figure className="image is-128x128 media-left m-5">
                                            <img src={user.avatar} className="is-rounded"></img>
                                        </figure>
                                        <div className="card-content">
                                            <strong className="has-text-white title">{user.login}</strong>
                                            <div className="has-text-white has-text-weight-semibold mx-3">
                                                <p>Total de séries: {user.stats.shows}</p>
                                                <p>Episodes vus: {user.stats.episodes}</p>
                                                <p>Badges: {user.stats.badges}</p>
                                                <p>Commentaires: {user.stats.comments}</p>
                                                <p>Amis: {user.stats.friends}</p>
                                                <p>Amis d'amis: {user.stats.friends_of_friends}</p>
                                                <p>Membre depuis {user.stats.member_since_days} jours</p>
                                                {user.twitterLogin &&
                                                    <p>Twitter: {user.twitterLogin}</p>
                                                }
                                                <p>Inscrit.e en {user.subscription}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-content has-text-white">
                                        <center>
                                            <span className="has-text-black" style={{zIndex: 2}}>XP: {user.xp}</span>
                                        </center>
                                        <progress className="progress is-success" value={user.stats.progress} max="100" style={{marginTop: "-1.25rem"}}>XP: {user.xp}</progress>
                                        <div className="ml-5">
                                            <p>Stats:</p>
                                            <div className="ml-3">
                                                <p>Séries terminées: <span className="has-text-weight-semibold">{user.stats.shows_finished}</span></p>
                                                <p>Saisons entamées: <span className="has-text-weight-semibold">{user.stats.seasons}</span></p>
                                                <p>Episodes par mois: <span className="has-text-weight-semibold">{user.stats.episodes_per_month}</span></p>
                                                <p>Episodes à voir pour monter en XP: <span className="has-text-weight-semibold">{user.stats.episodes_to_watch}</span></p>
                                                <p>Temps passé devant une série: <span className="has-text-weight-semibold">{Math.floor(user.stats.time_on_tv / 60)}h{(user.stats.time_on_tv % 60) < 10 ? '0' + user.stats.time_on_tv % 60 : user.stats.time_on_tv % 60}</span></p>
                                                <p>Temps à passer avant le prochain badge: <span className="has-text-weight-semibold">{Math.floor(user.stats.time_to_spend / 60)}h{(user.stats.time_to_spend % 60) < 10 ? '0' + user.stats.time_to_spend % 60 : user.stats.time_to_spend % 60}</span></p>
                                                <p>Genre préféré: <span className="has-text-weight-semibold">{user.stats.favorite_genre}</span></p>
                                                <p>Jour préféré: <span className="has-text-weight-semibold">{user.stats.favorite_day}</span></p>
                                                <p>Jours de visionnage d'affilée: <span className="has-text-weight-semibold">{user.stats.streak_days}</span></p>
                                                <p>Jours d'abstinence d'affilée: <span className="has-text-weight-semibold">{user.stats.without_days}</span></p>
                                                <p>Mots écrits: <span className="has-text-weight-semibold">{user.stats.written_words}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
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

export default User