import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import ShoutOut from "../model/ShoutOut";
import "./ShoutOutForm.css";

interface Props {
    onSubmit: (shoutOut: ShoutOut) => void;
  }

function ShoutOutForm( {onSubmit}: Props ) {
    const [ to, setTo ] = useState("");
    const [ message, setMessage ] = useState("");
    const { user } = useContext(AuthContext)

    function handleSubmit(event:FormEvent): void {
        event.preventDefault();
        const shoutOut: ShoutOut = {
          to: to,
          from: user?.displayName,
          message: message
        }
        onSubmit(shoutOut);
    
        // clear form
        setTo("");
        setMessage("");
      }
    

    return (
        <form className="ShoutOutForm" onSubmit={handleSubmit}>
            <p>
                <label htmlFor="ShoutOutForm_to">To:</label>
                <input id="ShoutOutForm_to" value={to} onChange={e => setTo(e.target.value)} required />
            </p>
            { 
            <p>
                <label htmlFor="ShoutOutForm_from">From:</label>
                {user!.displayName}
                {/* <input id="ShoutOutForm_from" value={user.displayName?.toString()} onChange={e => setFrom(e.target.value)} required />                 */}
            </p>            
            }

            <p>
                <label htmlFor="ShoutOutForm_message">Shout Out:</label>
                <textarea id="ShoutOutForm_message" value={message} onChange={e => setMessage(e.target.value)} rows={4} required></textarea> 
            </p>
            <p>
                <button type="submit">SHOUT IT OUT!</button>
            </p>
        </form>
    )
}

export default ShoutOutForm;