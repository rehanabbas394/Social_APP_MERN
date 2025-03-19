import { LoginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { useContext, useRef } from "react";
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const hundleSubmit = (e) => {
    e.preventDefault();
    LoginCall({ email: email.current.value, password: password.current.value}, dispatch)
    console.log(user)
  };
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
          <form className="loginBox" onSubmit={hundleSubmit}>
            <input
              placeholder="Email"
              type="email"
              required
              ref={email}
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              ref={password}
              className="loginInput"
            />
            <button className="loginButton" disabled={isFetching}>{isFetching? <CircularProgress color="white" size="20px" /> : "Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              { isFetching? <CircularProgress color="white" size="20px" /> : "Create a New Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
