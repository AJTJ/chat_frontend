import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { mq } from "../theme";

const api_address = "http://127.0.0.1:8081";

const ColoredDiv = styled.div`
  background: ${(p) => {
    let colorNum = p.num;

    return p.theme.colors["color" + colorNum];
  }};
`;

let TitleBar = styled.div`
  color: ${(p) => p.theme.colors.color1};
  font-size: 25px;
  font-weight: bolder;
  background: ${(p) => p.theme.colors.color2};
  text-align: center;
  /* padding: 10px 0; */
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

let LoginZone = styled.div`
  width: 100%;
  height: 90px;
`;

let AuthZone = styled.div`
  height: 50px;
  background: ${(p) => p.theme.colors.color2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;

  input[type="submit"],
  button {
    border-radius: 10px;
    margin: 0 2px;
    border: none;
    background: ${(p) => p.theme.colors.color1};
    color: ${(p) => p.theme.colors.color2};
    padding: 4px 2px;
    width: 45px;
    font-size: 10px;
  }
  .alt {
    background: ${(p) => p.theme.colors.color4};
    color: ${(p) => p.theme.colors.color2};
  }
  ${mq[2]} {
    flex-direction: column;
    justify-content: center;
  }
`;

let ServerMsg = styled.div`
  height: 15px;
  display: flex;
  align-items: center;
`;

let AuthThings = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
`;

let SignedInUser = styled.div`
  padding-right: 10px;
`;

let Form = styled.form`
  display: flex;
  align-items: center;
  input[type="text"],
  input[type="password"] {
    height: 28px;
    margin-right: 5px;
    border-radius: 5px;
    border: 1px solid black;
    padding: 5px;
    /* margin-top: 2px; */
    font-size: 12px;
    ${mq[2]} {
      font-size: 10px;
      width: 100px;
    }
  }
`;

let AuthTitle = styled.div`
  padding-right: 5px;
`;

export const SignUpLogin = ({
  ws,
  openSocket,
  setReconnectingMsg,
  cleanUpReceived,
  defaultConnectingMsg,
  signedInUser,
  reconnectingMsg,
  wsMessage,
  setWsMessage,
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  // HIDE/SHOW authform

  const logoutWS = () => {
    ws?.current?.close();
    cleanUpReceived();
  };

  const resetWs = () => {
    logoutWS();
    openSocket();
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
      res.json().then((body) => setWsMessage(body));
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
      res.json().then((body) => setWsMessage(body));
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
      res.json().then((body) => setWsMessage(body));
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
      <AuthZone>
        <ServerMsg>{wsMessage && <div>{wsMessage}</div>}</ServerMsg>
        <AuthThings>
          {!signedInUser ? (
            <>
              <AuthTitle>{isLoginForm ? "Login" : "Sign Up"}:</AuthTitle>
              <Form onSubmit={isLoginForm ? handleSignIn : handleSignUp}>
                <input
                  id="userInput"
                  type="text"
                  placeholder="Name"
                  autoComplete="username"
                  onChange={handleUserChange}
                  value={userName}
                />
                <input
                  id="passwordInput"
                  placeholder="password"
                  type="password"
                  autoComplete={
                    isLoginForm ? "current-password" : "new-password"
                  }
                  onChange={handlePasswordChange}
                  value={password}
                />
                <input type="submit" value="Submit" />
              </Form>
              <button
                className="alt"
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                {isLoginForm ? "Sign Up" : "Login"}
              </button>
            </>
          ) : (
            <>
              {signedInUser && (
                <SignedInUser>Welcome, {signedInUser}</SignedInUser>
              )}
              <button onClick={handleLogOut}>Log out</button>
            </>
          )}
        </AuthThings>
      </AuthZone>
    </LoginZone>
  );
};
