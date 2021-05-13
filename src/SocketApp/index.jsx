import React, { useState, useRef, useEffect } from "react";

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
struct ClientResponse {
    message: String,
    is_sign_in: bool,
    is_sign_up: bool,
    user_name: String,
    password: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct ClientMessage {
    user_id: i64,
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

const socket_address = "ws://127.0.0.1:8081/ws/";
const api_address = "http://127.0.0.1:8081";

const AppWs = () => {
  const [isPaused, setPause] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [receivedData, setReceivedData] = useState(undefined);
  const [messageValue, setMessageValue] = useState(undefined);
  const ws = useRef(null);

  const receivedDataJSON = receivedData ? JSON.parse(receivedData) : {};

  console.log({ json: receivedDataJSON?.all_messages });

  const allMessages = receivedDataJSON?.all_messages
    ? JSON.parse(receivedDataJSON.all_messages)
    : [];

  const openSocket = () => {
    ws.current = new WebSocket(socket_address);
    console.log(`current: ${ws.current}`);
    ws.current.onopen = () => {
      console.log("ws opened");
    };
    ws.current.onclose = () => console.log("ws closed");
  };

  // open the socket on page load
  useEffect(() => {
    openSocket();
    setIsOpen(true);

    return () => {
      // close the socket if it exists
      ws?.current?.close();
    };
  }, []);

  // handle messaging
  useEffect(() => {
    if (!ws.current) {
      console.log("no ws.current");
    }

    ws.current.onmessage = (e) => {
      if (isPaused) {
        console.log("is paused");
        return;
      }
      // const message = JSON.parse(e.data);
      console.log({ received_data: e.data });
      setReceivedData(e.data);
    };
  }, [ws?.current?.onmessage, isPaused]);

  // open change
  const handleOpenChange = () => {
    if (!!isOpen) {
      ws?.current?.close();
      setIsOpen(false);
    } else {
      openSocket();
      setIsOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const jsonObject = JSON.stringify({
      message: messageValue,
      is_sign_in: false,
      is_sign_up: true,
      user_name: "Henry",
      password: "password",
    });

    ws.current.send(jsonObject);
  };

  // Eventually user_id should be set somewhere and same with room_id
  const handleChange = (e) => {
    const jsonObject = JSON.stringify({
      user_id: 123,
      room_id: 456,
      message: e.target.value,
    });

    setMessageValue(jsonObject);
  };

  return (
    <div>
      <button onClick={() => setPause(!isPaused)}>
        {isPaused ? "Resume" : "Pause"}
      </button>
      <button onClick={() => handleOpenChange()}>
        {isOpen ? "Close" : "Open"}
      </button>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" />
      </form>
      <div>
        {allMessages?.map((message) => {
          return (
            <div key={message?.time + message?.message}>
              <div>{message?.user_id}</div>
              <div>{message?.time}</div>
              <div>{message?.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SignUp = () => {
  const [userName, setUserName] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const handleSignUp = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_name: userName, password: password }),
    };
    fetch(`${api_address}/signup/`, requestOptions).then((response) =>
      console.log("the signup response:", response)
    );
  };

  const handleUserChange = (e) => {
    setUserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <div>Login</div>
      <form onSubmit={handleSignUp}>
        <label htmlFor="userInput">
          Name
          <input id="userInput" type="text" onChange={handleUserChange} />
        </label>
        <label htmlFor="passwordInput">
          password
          <input
            id="passwordInput"
            type="password"
            onChange={handlePasswordChange}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <div>WS APP</div>
      <SignUp />
      <AppWs />
    </div>
  );
};

export default App;
