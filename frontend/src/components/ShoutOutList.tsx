import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { signInWithGoogle } from "../firebaseConfig";
import ShoutOut from "../model/ShoutOut";
import { createShoutOut, deleteShoutOut, readAllShoutOuts } from "../service/ShoutOutApiService";
import ShoutOutCard from "./ShoutOutCard";
import ShoutOutForm from "./ShoutOutForm";
import './ShoutOutList.css';

function ShoutOutList() {
  // array of shoutouts from the API
  const [ shoutouts, setShoutOuts ] = useState<ShoutOut[]>([]);
  const [ shoutOutsLoaded, setShoutOutsLoaded ] = useState(false);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    loadShoutOuts();
  }, []);

  function loadShoutOuts() {
    readAllShoutOuts().then(shoutOutsFromApi => {
      setShoutOuts(shoutOutsFromApi);
      setShoutOutsLoaded(true);
    });
  }

  function handleAddShoutOut(shoutOut: ShoutOut): void {
    createShoutOut(shoutOut).then(loadShoutOuts);
  }

  function handleDeleteShoutOut(shoutOutId: string|undefined): void {
    if (shoutOutId) {
      deleteShoutOut(shoutOutId).then(loadShoutOuts);
    }
  }

    return (
        <div className="ShoutOutList">
              { !shoutOutsLoaded ?
                  <p className="ShoutOutList__message">Loading...</p>
                : shoutouts.length === 0 ?
                  <p className="ShoutOutList__message">No Shout Outs</p>
                :
                  shoutouts.map(eachShoutOut => 
                    <ShoutOutCard key={eachShoutOut._id} shoutOut={eachShoutOut}
                                  onDelete={() => handleDeleteShoutOut(eachShoutOut._id)}
                    />)
              } 
              { !user ? 
              <p>Sign in to leave a shoutout
                <button onClick={signInWithGoogle} >Sign in with Google</button>
              </p>
              :  
              <div>
                <p>Leave a Shout Out</p>
                <ShoutOutForm onSubmit={handleAddShoutOut} />
              </div>
              }       

        </div>
    );
}

export default ShoutOutList;


