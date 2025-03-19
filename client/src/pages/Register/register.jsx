import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match!");
      passwordAgain.current.reportValidity();
      return;    }
    else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      try{
        await axios.post("http://localhost:4000/api/auth/register", user)
        navigate("/login")
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">FACEBOOK</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              ref={username}
              type="text"
              className="loginInput"
            />
            <input
              placeholder="Email"
              type="email"
              ref={email}
              required
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              min={6}
              ref={password}
              required
              className="loginInput"
            />
            <input
              placeholder="Password Again"
              type="password"
              min={6}
              ref={passwordAgain}
              required
              className="loginInput"
            />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
