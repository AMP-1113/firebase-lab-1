import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import ShoutOut from "../model/ShoutOut";
import { addLike, readAllShoutOuts } from "../service/ShoutOutApiService";
import "./ShoutOutCard.css"

interface Props {
    shoutOut: ShoutOut;
    onDelete: () => void;
}

interface RouteParams {
    to: string;
}

function ShoutOutCard({shoutOut, onDelete}: Props) {
    const [ shoutouts, setShoutOuts ] = useState<ShoutOut[]>([]);
    const [ shoutOutsLoaded, setShoutOutsLoaded ] = useState(false);
    const { to } = useParams<RouteParams>(); 
    const { user } = useContext(AuthContext);


  function loadShoutOuts() {
    readAllShoutOuts().then(shoutOutsFromApi => {
      setShoutOuts(shoutOutsFromApi);
      setShoutOutsLoaded(true);
    });
  }

  function handleAddLike(shoutOutId: string|undefined): void {
    if (shoutOutId) {
    //   shoutOut.likesArray.push(user?.uid!);
      addLike(shoutOut, user?.uid!).then(loadShoutOuts);
      console.log(shoutOut.likesArray);
      console.log(shoutOut.likesArray.length);
    }
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
             <p>
                 {shoutOut.likesArray.length}
             </p>
            <div className="ShoutOutCard_buttons">
                <button onClick={onDelete}>Delete</button>
                <button onClick={() => handleAddLike(shoutOut._id)}>Like</button>
                {/* <button onClick={shoutOut.likesArray?.map(eachShoutOut => shoutOut._id)}>Like</button> */}
            </div>
        </div>
    )
}

export default ShoutOutCard;