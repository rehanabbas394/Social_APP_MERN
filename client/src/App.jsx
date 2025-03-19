import HomePage from "./pages/home/home";
import PersonIcon from "@mui/icons-material/Person";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/login";
import Register from "./pages/Register/register";
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <div>
      <Router>
      <Routes> 
        <Route path="/" element={user ? <HomePage /> : <Login />} />
        <Route path="/login" element={ user? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user? <Navigate to="/" /> : <Register />} />
        <Route path="/profile/:username" element={user ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
