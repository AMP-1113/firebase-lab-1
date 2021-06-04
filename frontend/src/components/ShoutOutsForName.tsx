import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShoutOut from "../model/ShoutOut";
import { deleteShoutOut, readShoutOutsByTo } from "../service/ShoutOutApiService";
import ShoutOutCard from "./ShoutOutCard";
import './ShoutOutsForName.css';

interface RouteParams {
    to: string;
}

function ShoutOutsForName() {
    const { to } = useParams<RouteParams>(); 

    const [ shoutouts, setShoutOuts ] = useState<ShoutOut[]>([]);
    const [ shoutOutsLoaded, setShoutOutsLoaded ] = useState(false);

    useEffect(() => {
        loadShoutOuts();
      }, [to]);
    
      function loadShoutOuts() {
        console.log(to);
        readShoutOutsByTo(to).then(shoutOutsFromApi => {
          setShoutOuts(shoutOutsFromApi);
          setShoutOutsLoaded(true);
        });
      }
    
      function handleDeleteShoutOut(shoutOutId: string|undefined): void {
        if (shoutOutId) {
          deleteShoutOut(shoutOutId).then(loadShoutOuts);
        }
      }
    return (
        <div className="ShoutOutsForName">
            <h1>Shout Outs to Zee</h1>
            { !shoutOutsLoaded ?
                  <p className="ShoutOutList__message">Loading...</p>
                : shoutouts.length === 0 ?
                  <p className="ShoutOutList__message">No Shout Outs</p>
                :                  
            shoutouts.map(eachShoutOut => 
                    <ShoutOutCard key={eachShoutOut._id} shoutOut={eachShoutOut}
                                  onDelete={() => handleDeleteShoutOut(eachShoutOut._id)}
                    />) }
        </div>
    )
}

export default ShoutOutsForName;