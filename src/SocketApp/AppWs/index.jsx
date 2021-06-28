import React, { useState } from "react";

export const AppWs = ({
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
}) => {
  const [messageValue, setMessageValue] = useState(undefined);

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
      {!reconnectingMsg && wsMessage && <div>{wsMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" />
      </form>
      <div>
        {reconnectingMsg && <div>{reconnectingMsg}</div>}
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
      </div>
    </div>
  );
};
