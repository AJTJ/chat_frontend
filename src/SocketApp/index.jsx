import React, { useState, useRef, useEffect } from "react";
// test again again
/**

#[derive(Serialize, Deserialize, Debug)]
struct User {
    id: i64,
    name: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct DatabaseMessage {
    id: i64,
    user_id: i64,
    room_id: i64,
    message: String,
    #[serde(default = "default_time")]
    time: NaiveDateTime,
}

#[derive(Serialize, Deserialize, Debug)]
struct FromClient {
    message: String,
    user_name: String,
    password: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct SentToClient {
    user_name: String,
    room_id: i64,
    message: String,
    #[serde(default = "default_time")]
    time: NaiveDateTime,
}

fn default_time() -> NaiveDateTime {
    Utc::now().naive_utc()
}

#[derive(Serialize, Deserialize, Debug)]
struct ResponseToClient {
    all_messages: String,
    signed_in: bool,
    #[serde(default = "default_id")]
    id: String,
}

fn default_id() -> String {
    "Anonymous".to_string()
}

#[derive(Serialize, Deserialize, Debug)]
struct Room {
    id: i64,
    name: String,
}

struct WebSockActor {
    all_messages: serde_json::Value,
    db_pool: web::Data<SqlitePool>,
    id: Identity,
}

 */

const ws_address = "ws://127.0.0.1:8081";
const api_address = "http://127.0.0.1:8081";

const AppWs = ({
  user,
  ws,
  setUser,
  openSocket,
  receivedData,
  setReceivedData,
  isPaused,
  setPause,
  reconnecting,
}) => {
  const [messageValue, setMessageValue] = useState(undefined);
  const [allMessages, setAllMessages] = useState([]);
  const [wsMessage, setWsMessage] = useState(undefined);
  const [signedInUser, setSignedInUser] = useState(undefined);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const receivedDataJSON = receivedData ? JSON.parse(receivedData) : {};

    console.log({ receivedJson: receivedDataJSON });

    if (receivedDataJSON?.all_messages) {
      setAllMessages(JSON.parse(receivedDataJSON.all_messages));
    } else {
      setAllMessages([]);
    }

    if (receivedDataJSON?.message_to_client) {
      setWsMessage(receivedDataJSON.message_to_client);
    } else if (!receivedDataJSON?.is_update) {
      setWsMessage(undefined);
    }

    if (receivedDataJSON?.user_name) {
      setSignedInUser(receivedDataJSON.user_name);
    } else {
      setSignedInUser(undefined);
    }

    if (receivedDataJSON?.all_users) {
      setAllUsers(receivedDataJSON.all_users);
    } else {
      setAllUsers([]);
    }
  }, [receivedData]);

  // open the socket on page load
  useEffect(() => {
    openSocket();

    const currentWS = ws?.current;
    return () => {
      // close the socket if it exists
      currentWS?.close();
    };
  }, []);

  // handle messaging
  useEffect(() => {
    if (!ws.current) {
      console.log("no ws.current");
    }

    console.log({ ws, current_onmessage: ws.current });

    ws.current.onmessage = (e) => {
      if (isPaused) {
        console.log("is paused");
        return;
      }
      // const message = JSON.parse(e.data);
      console.log({ received_data: e.data });
      setReceivedData(e.data);
    };
  }, [ws, isPaused]);

  // open change
  const handleOpenChange = () => {
    if (ws?.current) {
      ws?.current?.close();
    } else {
      openSocket();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const jsonObject = JSON.stringify({
      message: messageValue,
    });
    ws?.current?.send && ws?.current?.send(jsonObject);
  };

  const handleChange = (e) => {
    setMessageValue(e.target.value);
  };

  return (
    <div>
      <button onClick={() => setPause(!isPaused)}>
        {isPaused ? "Resume" : "Pause"}
      </button>
      <button onClick={() => handleOpenChange()}>
        {ws?.current ? "Close" : "Open"}
      </button>
      {!reconnecting && <div>{wsMessage && wsMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" />
      </form>
      <div>
        {reconnecting ? (
          <div>Reconnecting...</div>
        ) : (
          <>
            {signedInUser && <div>Signed in as: {signedInUser}</div>}
            {!!allMessages?.length && (
              <div>
                Current users:
                {!allUsers.length ? (
                  <span>Nobody here</span>
                ) : (
                  <>
                    {allUsers.map((usr, i) => {
                      return <span key={i + usr}>{usr}</span>;
                    })}
                  </>
                )}
              </div>
            )}
            {allMessages?.map((message, i) => {
              return (
                <div key={message?.message + i + message?.time}>
                  <div>-</div>
                  <div key={message?.time + message?.message}>
                    <div>{message?.name}</div>
                    <div>{message?.time}</div>
                    <div>{message?.message}</div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

const SignUpLogin = ({ user, setUser, ws, openSocket }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [authMsg, setAuthMsg] = useState(undefined);
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
        <button onClick={handleLogOut}>Log out</button>
      </form>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState("");
  const ws = useRef(null);
  const [receivedData, setReceivedData] = useState(undefined);
  const [isPaused, setPause] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);

  const openSocket = () => {
    ws.current = new WebSocket(`${ws_address}/ws/`);

    ws.current.onopen = () => {
      console.log("ws opened");
      setReconnecting(false);
      ws.current.onmessage = (e) => {
        if (isPaused) {
          console.log("is paused");
          return;
        }
        // const message = JSON.parse(e.data);
        console.log({ received_data_HERE: e.data });
        setReceivedData(e.data);
      };
    };
    ws.current.onclose = () => {
      console.log("ws closed, attempting to reconnect");
      setReconnecting(true);
      setTimeout(() => {
        openSocket();
      }, 1000);
    };
  };

  return (
    <div>
      <div>WS APP HERE YALL!</div>
      <SignUpLogin {...{ user, setUser, ws, openSocket }} />
      <AppWs
        {...{
          user,
          ws,
          setUser,
          openSocket,
          receivedData,
          setReceivedData,
          isPaused,
          setPause,
          reconnecting,
        }}
      />
    </div>
  );
};

export default App;
