import React, { useState, useRef, useEffect } from "react";

const AppWs = () => {
  const [isPaused, setPause] = useState(false);
  const [receivedData, setReceivedData] = useState(undefined);
  const [inputValue, setInputValue] = useState(undefined);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://127.0.0.1:8081/ws/");
    console.log(ws.current);
    ws.current.onopen = () => {
      console.log("ws opened");
      // ws.current.send("dog");
    };
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      if (isPaused) return;
      // const message = JSON.parse(e.data);
      setReceivedData(e.data);
      console.log(e.data);
    };
  }, [isPaused]);

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
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" />
      </form>
      <div>{receivedData}</div>
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
