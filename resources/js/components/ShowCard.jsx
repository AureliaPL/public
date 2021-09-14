import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const ShowCard = (props) => {
    let [hasShow, setShow] = useState(false);
	const id = localStorage.getItem("token")

    const show = async () => {
        if(props.show.user.next.id) {
            setShow(true);
        }
    }

	const addShow = async (idShow) => await axios.post(`https://api.betaseries.com/shows/show`, {
        'id': idShow
    }, {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${id}`,
			"Accept": "application/json"
		}
	})
    .then(() => {
        setShow(true);
    })

	const rmShow = async (idShow) => await axios.delete(`https://api.betaseries.com/shows/show?id=${idShow}`, {
		"headers": {
			"X-BetaSeries-Key": "27e640f20736",
			"Authorization": `Bearer ${id}`,
			"Accept": "application/json"
		}
	})
    .then(() => {
        setShow(false);
    })

    useEffect(() => {
        show();
    }, [])

    return(
        <div style={{width: "280px", display: "inline-flex"}}>
			<Link to="/" className="card m-2">
				{props.show.images.poster &&
					<figure className="card-image">
						<img src={props.show.images.poster} className="image"></img>
					</figure>
				}
				<div className="card-content has-background-danger-dark has-text-white">
					<h1><strong>{props.show.title}</strong></h1>
                    {hasShow ?
                        <span className="button has-background-warning has-text-white" onClick={() => rmShow(props.show.id)}><strong>-</strong></span>
                    :
                        <span className="button has-background-success has-text-white" onClick={() => addShow(props.show.id)}><strong>+</strong></span>
                    }
				</div>
			</Link>
			<br/>
		</div>
    );
}

export default ShowCard;