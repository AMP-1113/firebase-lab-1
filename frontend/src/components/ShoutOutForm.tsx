import firebase from "../firebaseConfig";
import { FormEvent, useContext, useRef, useState } from "react";
import { AuthContext } from "../context/auth-context";
import ShoutOut from "../model/ShoutOut";
import "./ShoutOutForm.css";

interface Props {
    onSubmit: (shoutOut: ShoutOut) => void;
  }

function ShoutOutForm( {onSubmit}: Props ) {
    const [ to, setTo ] = useState("");
    const [ message, setMessage ] = useState("");
    const { user } = useContext(AuthContext);
    const photoInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    function handleSubmit(event:FormEvent): void {
        event.preventDefault();

        const shoutOut: ShoutOut = {
          to: to,
          from: user?.displayName,
          message: message,
          likesArray: []
        }

        const files = photoInputRef.current?.files;
        if (files && files[0]) {
            const photoFile = files[0];
            console.log(photoFile)

            const rootFolder = firebase.storage().ref();
            const profilePhotosFolder = rootFolder.child("profile-photos");

        profilePhotosFolder.child(photoFile.name).put(photoFile).then(snapshot => {
                snapshot.ref.getDownloadURL().then(url => {
                    // then save the shoutout
                    shoutOut.profilePhoto = url;
                    onSubmit(shoutOut);
                    clearForm();
                });
            });
        } else {
            onSubmit(shoutOut);
            clearForm();
        }
      }
        
      // clear form
        function clearForm() {
            setTo("");
            setMessage("");
            formRef.current?.reset();
        }

    return (
        <form className="ShoutOutForm" onSubmit={handleSubmit} ref={formRef} >
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
                <label htmlFor="ShoutOutForm_photo">Profile Photo</label>
                <input id="ShoutOutForm_photo" type="file" ref={photoInputRef} />
            </p>
            <p>
                <button type="submit">SHOUT IT OUT!</button>
            </p>
        </form>
    )
}

export default ShoutOutForm;