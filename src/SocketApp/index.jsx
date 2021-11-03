import React, { useState, useRef, useEffect } from "react";
import { AppWs } from "./AppWs";
import { SignUpLogin } from "./SignUpLogin";
// import testData from "./test.json";
import { Global, theme } from "./theme";
import { ThemeProvider } from "@emotion/react";

const App = () => {
  // DATA from server
  // const [receivedData, setReceivedData] = useState(JSON.stringify(testData));
  const [receivedData, setReceivedData] = useState(undefined);
  const [wsMessage, setWsMessage] = useState(undefined);
  const [allMessages, setAllMessages] = useState([]);
  const [signedInUser, setSignedInUser] = useState(undefined);
  const [allUsers, setAllUsers] = useState([]);
  const [reconnectingMsg, setReconnectingMsg] = useState(undefined);

  const defaultConnectingMsg = "Attempting to Connect";
  const pleaseLoginMsg = "Please login or register";

  //68.183.138.33:8081;

  // LOCAL SETUP
  const SERVER_ADDRESS = "//127.0.0.1:8081";
  const WS_SERVER_ADDRESS = `ws:${SERVER_ADDRESS}/ws/`;
  const AMENDED_SERVER_ADDRESS = `http:${SERVER_ADDRESS}`;

  // PROD SETUP
  // const SERVER_ADDRESS = "//chat.freedivingsource.com";
  // const WS_SERVER_ADDRESS = `wss:${SERVER_ADDRESS}/ws/`;
  // const AMENDED_SERVER_ADDRESS = `https:${SERVER_ADDRESS}`;

  // FRONT END SOCKET
  const ws = useRef(null);

  const cleanUpReceived = (props) => {
    const { isLogout } = props || {};
    setReceivedData(undefined);
    setAllMessages([]);
    setSignedInUser(undefined);
    setAllUsers([]);
    setWsMessage(isLogout ? pleaseLoginMsg : undefined);
  };

  const openSocket = (props) => {
    setReconnectingMsg(defaultConnectingMsg);

    // origin: "https://chat.freedivingsource.com"
    // setTimeout(() => {
    ws.current = new WebSocket(WS_SERVER_ADDRESS);

    if (ws.current) {
      ws.current.onopen = () => {
        console.log("ws opened");
        // reset messages
        setWsMessage(undefined);
        setReconnectingMsg(undefined);
        if (ws?.current) {
          ws.current.onmessage = (e) => {
            setReceivedData(e.data);
          };
        }
      };
      ws.current.onclose = () => {
        console.log("ws closed");
        if (!wsMessage) setWsMessage(pleaseLoginMsg);
      };
    }
    setReconnectingMsg(undefined);
    // }, 2000);
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
          AMENDED_SERVER_ADDRESS,
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
