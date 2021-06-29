import React, { useState, useRef, useEffect } from "react";
import { AppWs } from "./AppWs";
import { SignUpLogin } from "./SignUpLogin";

const ws_address = "ws://127.0.0.1:8081";

const App = () => {
  // DATA from server
  const [receivedData, setReceivedData] = useState(undefined);
  const [wsMessage, setWsMessage] = useState(undefined);
  const [allMessages, setAllMessages] = useState([]);
  const [signedInUser, setSignedInUser] = useState(undefined);
  const [allUsers, setAllUsers] = useState([]);

  // FRONT END SOCKET
  const ws = useRef(null);
  const [isPaused, setPause] = useState(false);
  const [reconnectingMsg, setReconnectingMsg] = useState(undefined);
  const [attemptingSignIn, setAttemptingSignIn] = useState(false);

  const defaultConnectingMsg = "Attempting to Connect";

  const cleanUpReceived = () => {
    setReceivedData(undefined);
    setWsMessage(undefined);
    setAllMessages([]);
    setSignedInUser(undefined);
    setAllUsers([]);
  };

  const openSocket = (props) => {
    let { attemptIncrement = 0 } = props || {};

    let attempt = 1 + attemptIncrement;
    console.log(attempt);

    ws.current = new WebSocket(`${ws_address}/ws/`);

    ws.current.onopen = () => {
      console.log("ws opened");
      setReconnectingMsg(undefined);
      if (ws?.current) {
        ws.current.onmessage = (e) => {
          if (isPaused) {
            console.log("is paused");
            return;
          }
          console.log({ received_data_HERE: e.data });
          setReceivedData(e.data);
        };
      }
    };
    ws.current.onclose = () => {
      console.log("ws closed");
    };
  };

  // open the socket on page load
  useEffect(() => {
    openSocket();

    const currentWS = ws?.current;
    return () => {
      // close the socket
      currentWS?.close();
    };
  }, []);

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

    if (receivedDataJSON?.all_online_users) {
      setAllUsers(receivedDataJSON.all_online_users);
    } else {
      setAllUsers([]);
    }
  }, [receivedData]);

  return (
    <div>
      <div>Rusty Chat</div>
      <SignUpLogin
        {...{
          ws,
          openSocket,
          setReconnectingMsg,
          cleanUpReceived,
          defaultConnectingMsg,
        }}
      />
      <AppWs
        {...{
          ws,
          openSocket,
          receivedData,
          setReceivedData,
          isPaused,
          setPause,
          reconnectingMsg,
          allMessages,
          setAllMessages,
          wsMessage,
          setWsMessage,
          signedInUser,
          setSignedInUser,
          allUsers,
          setAllUsers,
        }}
      />
    </div>
  );
};

export default App;
