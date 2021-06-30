import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

const api_address = "http://127.0.0.1:8081";

const ColoredDiv = styled.div`
  background: ${(p) => {
    let colorNum = p.num;

    return p.theme.colors["color" + colorNum];
  }};
`;

let TitleBar = styled.div`
  color: ${(p) => p.theme.colors.color1};
  font-size: 40px;
  font-weight: bolder;
  background: ${(p) => p.theme.colors.color2};
  text-align: center;
  padding: 10px 0;
`;

let LoginZone = styled.div`
  height: 200px;
  /* position: fixed; */
  /* top: 0; */
  width: 100%;
`;

export const SignUpLogin = ({
  ws,
  openSocket,
  setReconnectingMsg,
  cleanUpReceived,
  defaultConnectingMsg,
  signedInUser,
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [authMsg, setAuthMsg] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // HIDE/SHOW authform
  useEffect(() => {
    if (signedInUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [signedInUser]);

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
    <LoginZone>
      <TitleBar>Rusty Chat</TitleBar>

      {!isLoggedIn && (
        <>
          <button onClick={() => setIsLoginForm(!isLoginForm)}>
            {isLoginForm ? "SignUp" : "Login"}
          </button>
          <div>{isLoginForm ? "Login" : "SignUp"}</div>
          <form onSubmit={isLoginForm ? handleSignIn : handleSignUp}>
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
        </>
      )}
      {isLoggedIn && <button onClick={handleLogOut}>Log out</button>}
    </LoginZone>
  );
};
