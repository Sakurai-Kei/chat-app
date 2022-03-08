import { useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

function LogIn() {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const app = initializeApp(firebaseConfig);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  auth.languageCode = "it";

  (async function getResult() {
    try {
      let result = await getRedirectResult(auth);
      if (result !== null) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const token = credential?.accessToken;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const user = result.user;
        navigate("/chat-room", { replace: true });
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(errorCode, errorMessage, email, credential);
    }
  })();

  function googleSignIn() {
    setPersistence(auth, browserSessionPersistence);
    signInWithRedirect(auth, provider);
  }

  return (
    <div className="login login-container">
      <div>Please choose your login method</div>
      <button
        type="button"
        onClick={googleSignIn}
        className="btn btn-login-google"
      >
        Login with Google Account
      </button>
    </div>
  );
}

export default LogIn;
