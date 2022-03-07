import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebaseConfig';

function LogIn() {
  const navigate = useNavigate();

  const app = initializeApp(firebaseConfig);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  auth.languageCode = "it";

  async function googleSignIn() {
    try {
    // let result = await signInWithPopup(auth, provider);
    let result = await setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithPopup(auth, provider);
      })
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    if(user) {
      navigate("/chat-room", { replace: true })
    }

    }
    catch(error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(error);
    }
  }

    return(
        <div className="login login-container">
            <div>Please choose your login method</div>
            <button type="button" onClick={googleSignIn}  className="btn btn-login-google">Login with Google Account</button>
        </div>
    );
}

export default LogIn;