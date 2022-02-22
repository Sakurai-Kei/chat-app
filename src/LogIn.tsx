import { useNavigate } from "react-router-dom";


function LogIn() {
    const navigate = useNavigate();

    const handleClick = (event: unknown) => {
        navigate("/chat-room")
    }

    return(
        <div className="login login-container">
            <div>Please choose your login method</div>
            <button type="button" onClick={handleClick}  className="btn btn-login-google">Login with Google Account</button>
        </div>
    );
}

export default LogIn;