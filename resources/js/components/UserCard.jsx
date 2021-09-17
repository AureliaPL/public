import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const UserCard = (props) => {
    let [isFetched, setFetch] = useState(false)
    let [user, setUser] = useState([])
	const userId = localStorage.getItem("token")

    const fetchData = async () => await axios.get(`https://api.betaseries.com/members/infos?id=${props.user.id}`, {
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

    const addFriend = async () => await axios.post(`https://api.betaseries.com/friends/friend`, {
        "id": user.id
    },{
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${userId}`,
			"Accept": "application/json"
		}
    })
    .then(() => {
        alert(`${user.login} a été ajouté.e aux amis`)
    })
    
    const unfriend = async () => await axios.delete(`https://api.betaseries.com/friends/friend?id=${user.id}`, {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${userId}`,
			"Accept": "application/json"
		}
    })
    .then(() => {
        alert(`${user.login} a été retiré.e des amis`)
    })
    
    const block = async () => await axios.post(`https://api.betaseries.com/friends/block`, {
        "id": user.id
    }, {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${userId}`,
			"Accept": "application/json"
		}
    })
    .then(() => {
        alert(`${user.login} a été bloqué.e`)
    })
    
    useEffect(() => {
        fetchData();
    }, [])

    return(
        <div style={{width: "280px", display: "inline-flex"}}>
        {isFetched ?
            <Link to={`/user/${props.user.id}`} className="card has-background-danger-dark m-2">
                {user.avatar &&
                    <figure className="card-image">
                        <img className="image" style={{width: "100%"}} src={user.avatar}></img>
                    </figure>
                }
                <div className="card-content">
                    <h1 className="title has-text-white">{user.login}</h1>
                    <span className="button has-background-success has-text-white m-1" onClick={(e) => { e.preventDefault(); addFriend() }}><strong>Ajouter aux amis</strong></span>
                    <span className="button has-background-warning has-text-white m-1" onClick={(e) => { e.preventDefault(); unfriend() }}><strong>Retirer des amis</strong></span>
                    <span className="button has-background-danger has-text-white m-1" onClick={(e) => { e.preventDefault(); block() }}><strong>Bloquer</strong></span>
                </div>
            </Link>
        :
            <progress className="progress is-danger"></progress>
        }
        </div>
    )
}

export default UserCard