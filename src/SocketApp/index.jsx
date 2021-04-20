import React, { useState, useRef, useEffect } from "react";

const AppWs = () => {
  const [isPaused, setPause] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [receivedData, setReceivedData] = useState(undefined);
  const [inputValue, setInputValue] = useState(undefined);
  const ws = useRef(null);

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
      console.log("inside onmessage");
      if (isPaused) {
        console.log("is paused");
        console.log("is paused");
        return;
      }
      // const message = JSON.parse(e.data);
      setReceivedData(e.data);
      console.log(e.data);
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
    ws.current.send(inputValue);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
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
      <div>Response: {receivedData}</div>
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
