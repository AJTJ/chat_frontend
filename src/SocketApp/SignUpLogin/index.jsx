import React, { useState } from "react";

const api_address = "http://127.0.0.1:8081";

export const SignUpLogin = ({
  ws,
  openSocket,
  setReconnectingMsg,
  cleanUpReceived,
  defaultConnectingMsg,
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [authMsg, setAuthMsg] = useState(undefined);
  const [showAuthForm, setShowAuthForm] = useState(true);

  const logoutWS = () => {
    ws?.current?.close();
    cleanUpReceived();
  };

  const resetWs = () => {
    logoutWS();
    setReconnectingMsg(defaultConnectingMsg);
    setTimeout(() => {
      openSocket();
    }, 2000);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ user_name: userName, password: password }),
    };
    fetch(`${api_address}/signup/`, requestOptions).then((res) => {
      res.json().then((body) => setAuthMsg(body));
      resetWs();
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ user_name: userName, password: password }),
    };
    fetch(`${api_address}/login/`, requestOptions).then((res) => {
      res.json().then((body) => setAuthMsg(body));
      resetWs();
    });
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      // body: JSON.stringify({ user_name: userName, password: password }),
    };
    fetch(`${api_address}/logout/`, requestOptions).then((res) => {
      res.json().then((body) => setAuthMsg(body));
      logoutWS();
    });
  };

  const handleUserChange = (e) => {
    setUserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "SignUp" : "Login"}
      </button>
      <div>{isLogin ? "Login" : "SignUp"}</div>
      {showAuthForm && (
        <form onSubmit={isLogin ? handleSignIn : handleSignUp}>
          {authMsg && <div>{authMsg}</div>}
          <label htmlFor="userInput">
            Name
            <input
              id="userInput"
              type="text"
              onChange={handleUserChange}
              value={userName}
            />
          </label>
          <label htmlFor="passwordInput">
            password
            <input
              id="passwordInput"
              type="password"
              onChange={handlePasswordChange}
              value={password}
            />
          </label>
          <input type="submit" />
        </form>
      )}
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
};
