import "./Header.css";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

function Header() {
    const { user } = useContext(AuthContext)
    console.log(user);

    return(
        <header className="Header">
            <h1>SHOUT OUTS</h1>
            <div className="userNamePhotoButton">
                { user && 
                    <div className="Header_user">
                        { !!user.photoURL && <img className="userIMG" src={user.photoURL} alt="" />}
                        {user.displayName}
                    </div> 
                }
                {
                !user ? 
                    <button onClick={signInWithGoogle} >Sign in with Google</button>
                :
                    <button onClick={signOut} >Sign out</button>
                }
            </div>


        </header>
    )
}

export default Header;