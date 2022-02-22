import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import LogIn from "./LogIn";
import ChatRoom from "./ChatRoom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/chat-room" element={<ChatRoom />} />
    </Routes>
  );
}

export default App;
