import { useEffect, useState } from "react";
import ShoutOut from "../model/ShoutOut";
import { createShoutOut, deleteShoutOut, readAllShoutOuts } from "../service/ShoutOutApiService";
import ShoutOutCard from "./ShoutOutCard";

function ShoutOutList() {
  // array of shoutouts from the API
  const [ shoutouts, setShoutOuts ] = useState<ShoutOut[]>([]);
  const [ shoutOutsLoaded, setShoutOutsLoaded ] = useState(false);

  useEffect(() => {
    loadShoutOuts();
  }, []);

  function loadShoutOuts() {
    readAllShoutOuts().then(shoutOutsFromApi => {
      setShoutOuts(shoutOutsFromApi);
      setShoutOutsLoaded(true);
    });
  }

  function handleAddStudent(shoutOut: ShoutOut): void {
    createShoutOut(shoutOut).then(loadShoutOuts);
  }

  function handleDeleteStudent(shoutOutId: string|undefined): void {
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
                          onDelete={() => handleDeleteStudent(eachShoutOut._id)}
            />)
      }           
        </div>
    )
}

export default ShoutOutList;