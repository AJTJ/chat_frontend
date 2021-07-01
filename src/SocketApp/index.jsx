import React, { useState, useRef, useEffect } from "react";
import { AppWs } from "./AppWs";
import { SignUpLogin } from "./SignUpLogin";
// import testData from "./test.json";
import { Global, theme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";

const ws_address = "ws://127.0.0.1:8081";

const App = () => {
  // DATA from server
  // const [receivedData, setReceivedData] = useState(JSON.stringify(testData));
  const [receivedData, setReceivedData] = useState(undefined);
  const [wsMessage, setWsMessage] = useState(undefined);
  const [allMessages, setAllMessages] = useState([]);
  const [signedInUser, setSignedInUser] = useState(undefined);
  const [allUsers, setAllUsers] = useState([]);

  console.log({ wsMessage });

  // FRONT END SOCKET
  const ws = useRef(null);
  const [reconnectingMsg, setReconnectingMsg] = useState(undefined);

  const defaultConnectingMsg = "Attempting to Connect";

  const cleanUpReceived = () => {
    setReceivedData(undefined);
    setAllMessages([]);
    setSignedInUser(undefined);
    setAllUsers([]);
  };

  const openSocket = (props) => {
    setReconnectingMsg(defaultConnectingMsg);

    setTimeout(() => {
      ws.current = new WebSocket(`${ws_address}/ws/`);

      if (ws.current) {
        // reset messages
        setWsMessage(undefined);
        ws.current.onopen = () => {
          console.log("ws opened");
          setReconnectingMsg(undefined);
          if (ws?.current) {
            ws.current.onmessage = (e) => {
              console.log({ received_data_HERE: e.data });
              setReceivedData(e.data);
            };
          }
        };
        ws.current.onclose = () => {
          console.log("ws closed");
        };
      }
      setReconnectingMsg(undefined);
    }, 2000);
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
      setWsMessage(wsMessage);
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
      <SignUpLogin
        {...{
          ws,
          openSocket,
          setReconnectingMsg,
          cleanUpReceived,
          defaultConnectingMsg,
          reconnectingMsg,
          wsMessage,
          setWsMessage,
          signedInUser,
        }}
      />
      <AppWs
        {...{
          ws,
          reconnectingMsg,
          allMessages,
          allUsers,
          signedInUser,
        }}
      />
    </div>
  );
};

const ExportedApp = () => (
  <ThemeProvider theme={theme}>
    <Global />
    <App />
  </ThemeProvider>
);

export default ExportedApp;
