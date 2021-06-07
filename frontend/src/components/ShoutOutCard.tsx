import React from "react";
import { Link, useParams } from "react-router-dom";
import ShoutOut from "../model/ShoutOut";
import "./ShoutOutCard.css"

interface Props {
    shoutOut: ShoutOut;
    onDelete: () => void;
}

interface RouteParams {
    to: string;
}

function ShoutOutCard({shoutOut, onDelete}: Props) {
    const { to } = useParams<RouteParams>(); 
    return (
        <div className="ShoutOutCard">
            <div>
                { shoutOut.to === to ?
                <h3 className="ShoutOutCard_to">Shout out to <Link to="/user/Zee">{shoutOut.to}</Link> </h3>
                :
                <h3 className="ShoutOutCard_to">Shout out to {shoutOut.to} </h3>
                }
            </div>
            <div>
                { shoutOut.from === to ?
                <p className="ShoutOutCard_from">-from <Link to="/user/Zee">{shoutOut.from}</Link> </p>
                :
                <p className="ShoutOutCard_from">-from {shoutOut.from} </p>
                }
            </div>

            
            <p> {shoutOut.message} </p>
            <button onClick={onDelete}>Delete</button>
        </div>
    )
}

export default ShoutOutCard;