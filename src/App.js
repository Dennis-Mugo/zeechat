import logo from "./logo.svg";
import "./App.css";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin/Signin";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import StarterPage from "./pages/StarterPage/StarterPage";
import Chat from "./pages/Chat/Chat";
import EmailVerify from "./pages/EmailVerify/EmailVerify";
import AuthWrapper from "./components/AuthWrapper/AuthWrapper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StarterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/chat" element={<AuthWrapper Page={Chat} />} />
      </Routes>
    </Router>
  );
}

export default App;
