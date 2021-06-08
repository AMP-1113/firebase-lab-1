import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import ShoutOut from "../model/ShoutOut";
import { addLike } from "../service/ShoutOutApiService";
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
    const { user } = useContext(AuthContext);
    const [ likes, setLikes ] = useState(['']);
    const [ likesLoaded, setlikesLoaded ] = useState(true);


    function loadLikes() {
        setLikes(shoutOut.likesArray);
        setlikesLoaded(true);
      }

    function handleAddLike(userUid: string): void {
        if (!isInArray(userUid)) {
            addLike(shoutOut, user?.uid!).then(loadLikes);
            setlikesLoaded(false);
        }
        console.log(shoutOut.likesArray)
    }

    function isInArray(uid: string) {
        return shoutOut.likesArray.some(
        (existingUid) => existingUid === uid);
    }

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
            { !!shoutOut.profilePhoto && 
            <p>
                <img className="ShoutOutCard_photo" src={shoutOut.profilePhoto} alt="" />
             </p> }
             <div>
                { !likesLoaded ?
                    <p className="ShoutOutList__message"> :-) </p>
                    : likes.length === 0 ?
                    <p className="ShoutOutList__message">No Likes</p>
                    :
                    <p></p>
                } 
             </div>
            <div className="ShoutOutCard_buttons">
                <button onClick={onDelete}>Delete</button>
                <button onClick={() => handleAddLike(user?.uid!)}>Likes: {shoutOut.likesArray.length}</button>
                {/* <button onClick={() => handleAddLike(shoutOut._id)}>Like</button> */}
            </div>
        </div>
    )
}

export default ShoutOutCard;