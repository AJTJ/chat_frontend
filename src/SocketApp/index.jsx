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

fn default_time() -> NaiveDateTime {
    Utc::now().naive_utc()
}
#[derive(Serialize, Deserialize, Debug)]
struct Room {
    id: i64,
    name: String,
}
 */

const AppWs = () => {
  const [isPaused, setPause] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [receivedData, setReceivedData] = useState(undefined);
  const [messageValue, setMessageValue] = useState(undefined);
  const ws = useRef(null);

  const allMessages = receivedData ? JSON.parse(receivedData) : [];

  const socket_address = "ws://127.0.0.1:8081/ws/";

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
    ws.current.send(messageValue);
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

const App = () => {
  return (
    <div>
      <div>WS APP</div>
      <AppWs />
    </div>
  );
};

export default App;
