import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  var sectionStyle = {
    backgroundImage: "url(" + "https://www.shimokitazawa.info/wp-content/uploads/2021/06/komichinonoel-2021s.jpg" + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div>
    <div className="login"
    style={{sectionStyle}}>
      <div className="login__container">
      <img src="https://www.shimokitazawa.info/wp-content/uploads/2021/06/komichinonoel-2021s.jpg" alt="Noel festival" class="festival__banner"/>
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Sign in
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
        <div>
          Forgot your password? <Link to="/reset">Password reset</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
    </div>
  );
}
export default Login;
