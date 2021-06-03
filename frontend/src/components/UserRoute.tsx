import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShoutOut from "../model/ShoutOut";
import { deleteShoutOut, readAllZeeShoutOuts } from "../service/ShoutOutApiService";
import ShoutOutCard from "./ShoutOutCard";

interface RouteParams {
    name: string;
}

function UserRoute() {
    const [ shoutouts, setShoutOuts ] = useState<ShoutOut[]>([]);
    const [ shoutOutsLoaded, setShoutOutsLoaded ] = useState(false);
    const { name } = useParams<RouteParams>(); 

    useEffect(() => {
        loadShoutOuts();
      }, []);
    
      function loadShoutOuts() {
        readAllZeeShoutOuts().then(shoutOutsFromApi => {
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
        <div className="UserRoute">
            <h1>Shout Outs to Zee</h1>
            {                   shoutouts.map(eachShoutOut => 
                    <ShoutOutCard key={eachShoutOut._id} shoutOut={eachShoutOut}
                                  onDelete={() => handleDeleteShoutOut(eachShoutOut._id)}
                    />) }
        </div>
    )
}

export default UserRoute;