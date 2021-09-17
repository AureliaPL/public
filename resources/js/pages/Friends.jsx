import React, { useEffect, useState } from 'react';
import {Link, Redirect, useParams} from "react-router-dom";
import axios from 'axios';
import UserCard from '../components/UserCard';

const Friends = () => {
    let [isFetched, setFetch] = useState(false);
    let [friendList, setFriendList] = useState([]);
    let [results, setResults] = useState([]);
    let [needle, setNeedle] = useState("");
    const {id} = useParams();
	const userId = localStorage.getItem("token");

    const fetchData = async () => await axios.get(`https://api.betaseries.com/friends/list`, {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${userId}`,
			"Accept": "application/json"
		}
    })
    .then((res) => {
        setFriendList(res.data.users);
    })
    .finally(() => {
        setFetch(true);
    })

    const search = async () => await axios.get(`https://api.betaseries.com/members/search?login=${needle}&limit=25`, {
        "headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${userId}`,
			"Accept": "application/json"
		}
    })
    .then((res) => {
        setResults(res.data.users)
    })

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if(needle.length > 1) {
            search();
        }
    }, [needle])

    return (
		<section className="section">
            <div className="container">
                {localStorage.token ?
                    <>
                        <center>
							<h1 className="title">
								Amis
							</h1>
							<hr className="has-background-danger-dark" />
							{isFetched ?
                                <>
                                    <input className="input m-1" type="text" value={needle} onChange={(e) => setNeedle(e.target.value)}></input>
                                    {needle.length > 1 ?
                                        <>
                                            {results &&
                                                <>
                                                    {results.map((result) => (
                                                        <UserCard key={result.id} user={result}/>
                                                    ))}
                                                </>
                                            }
                                        </>
                                    :
                                        <>
                                            {friendList.map((friend) => (
                                                <UserCard key={friend.id} user={friend}/>
                                            ))}
                                        </>
                                    }
                                </>
							:
							    <progress className="progress is-danger" >Loading...</progress>
							}
						</center>
                    </>
                :
                    <Redirect to="/"/>
                }
            </div>
        </section>

    )
}

export default Friends