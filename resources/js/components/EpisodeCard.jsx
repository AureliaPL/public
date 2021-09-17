import React, { useEffect, useState } from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const EpisodeCard = (props) => {
    let [seen, setSeen] = useState(false)
    let [commenting, setCommenting] = useState(false)
    let [commentText, setComment] = useState("")
    const episode = props.episode
	const id = localStorage.getItem("token")

    const isSeen = () => {
        if(episode.user.seen) {
            setSeen(true);
        }
    }

    const seeOne = async () => await axios.post(`https://api.betaseries.com/episodes/watched`, {
        'id': episode.id
    }, {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${id}`,
			"Accept": "application/json"
        }
	})
    .then(() => {
        setSeen(true)
    })

    const seeAll = async () => await axios.get(`https://api.betaseries.com/shows/episodes?id=${episode.show.id}`, {
        "headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${id}`,
			"Accept": "application/json"
        }
    })
    .then((res) => {
        res.data.episodes.forEach(epi => {
            if(epi.id <= episode.id && !epi.user.seen) {
                axios.post(`https://api.betaseries.com/episodes/watched`, {
                    'id': epi.id
                }, {
                    "headers": {
                        "X-BetaSeries-Key": "27e640f20736",
                        "Authorization": `Bearer ${id}`,
                        "Accept": "application/json"
                    }
                })
            }
        });
        setSeen(true);
    })

    const unseeOne = async () => await axios.delete(`https://api.betaseries.com/episodes/watched?id=${episode.id}`, {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${id}`,
			"Accept": "application/json"
        }
	})
    .then(() => {
        setSeen(false)
    })

    const unseeAll = async () => await axios.get(`https://api.betaseries.com/shows/episodes?id=${episode.show.id}`, {
        "headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${id}`,
			"Accept": "application/json"
        }
    })
    .then((res) => {
        res.data.episodes.forEach(epi => {
            if(epi.id <= episode.id && epi.user.seen) {
                axios.delete(`https://api.betaseries.com/episodes/watched?id=${epi.id}`, {
                    "headers": {
                        "X-BetaSeries-Key": "27e640f20736",
                        "Authorization": `Bearer ${id}`,
                        "Accept": "application/json"
                    }
                })
            }
        });
        setSeen(false);
    })

    const comment = async () => await axios.post(`https://api.betaseries.com/comments/comment`, {
        'type': 'episode',
        'id': episode.id,
        'text': commentText
    }, {
        "headers": {
            "X-BetaSeries-Key": "27e640f20736",
            "Authorization": `Bearer ${id}`,
            "Accept": "application/json"
        }
    })
    .then((res) => {
        setCommenting(false);
        setComment("");
        alert("Commentaire posté: " + res.data.comment.text);
    })

    useEffect(() => {
        isSeen();
    }, [])

    return(
        <div className="columns mx-1">
            {seen ?
                <>
                    <div className="column">
                        <Link to={`/episode/${episode.id}`} className="has-text-white">
                            {episode.code}: {episode.title}
                            <br/>
                            <strong className="has-text-success has-font-weight-semibold mx-3">Vu</strong>
                            {commenting &&
                                <>
                                    <br/>
                                    <div onClick={(e) => {e.preventDefault()}}>
                                        <textarea  className="input" value={commentText} onChange={(e) => setComment(e.target.value)} style={{height: "7rem", resize: "none"}} name="comment"></textarea>
                                        <button className="button" onClick={() => {setCommenting(false)}}>X</button>
                                        <button className="button" onClick={() => {comment()}}>Poster</button>
                                    </div>
                                </>
                            }
                        </Link>
                    </div>

                    <div className="column is-flex is-justify-content-flex-end">
                        <span>
                            <button className="button has-background-danger has-text-white mx-1" onClick={() => {unseeOne()}}>Revoir</button>
                            <button className="button has-background-danger-dark has-text-white mx-1" onClick={() => {unseeAll()}}>Tout revoir</button>
                            <button className="button has-background-white has-text-grey mx-1" onClick={() => {setCommenting(true)}}>Commenter</button>
                        </span>
                    </div>
                </>
            :
                <>
                    <Link to={`/episode/${episode.id}`} className="column has-text-white">
                        {episode.code}: {episode.title}
                        {commenting &&
                            <>
                                <br/>
                                <div onClick={(e) => {e.preventDefault()}}>
                                    <textarea  className="input" value={commentText} onChange={(e) => setComment(e.target.value)} style={{height: "7rem", resize: "none"}} name="comment"></textarea>
                                    <button className="button" onClick={() => {setCommenting(false)}}>X</button>
                                    <button className="button" onClick={() => {comment()}}>Poster</button>
                                </div>
                            </>
                        }
                    </Link>
                    <div className="column">
                        <span className="is-flex is-justify-content-flex-end">
                            <button className="button has-background-success has-text-white mx-1" onClick={() => {seeOne()}}>Vu</button>
                            <button className="button has-background-success-dark has-text-white mx-1" onClick={() => {seeAll()}}>Tous vus</button>
                            <button className="button has-background-white has-text-grey mx-1" onClick={() => {setCommenting(true)}}>Commenter</button>
                        </span>
                    </div>
                </>
            }
            <br/>
        </div>
    );
}

export default EpisodeCard