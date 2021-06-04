import "./Header.css";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

function Header() {
    const { user } = useContext(AuthContext)
    console.log(user);

    return(
        <header className="Header">
            <button onClick={signInWithGoogle} >Sign in with Google</button>
            <button onClick={signOut} >Sign out</button>
            { user && <div>
                Welcome {user.displayName}!
                { !!user.photoURL && <img src={user.photoURL} alt="photo" />}
            </div> }
        </header>
    )
}

export default Header;