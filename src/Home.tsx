import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="home home-container">
      <div className="home-title">
        Welcome to Snap Chat App Home Page.
        <br /> Please login to proceed to the chat room
      </div>
      <button type="button" onClick={handleClick} className="btn btn-to-login">
        Login Page
      </button>
    </div>
  );
}

export default Home;
