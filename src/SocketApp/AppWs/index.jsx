import React, { useState } from "react";
import styled from "@emotion/styled";
import moment from "moment";

const MessageContainer = styled.div`
  padding: 5px 0;
`;

const MessageName = styled.span`
  color: ${(p) => p.theme.colors.color1};
  padding-right: 15px;
  font-weight: bold;
`;

const MessageTime = styled.span`
  color: ${(p) => p.theme.colors.color4};
  font-size: 11px;
`;

const MessageContent = styled.div`
  padding: 5px 0 10px;
`;

const MsgForm = styled.form`
  position: fixed;
  bottom: 0;
  background: ${(p) => p.theme.colors.color1};
  width: 100%;
  height: 50px;
  margin: 0;
  padding: 0;
`;

const MsgInput = styled.textarea`
  width: 100%;
  background: white;
  /* max-height: 33px; */
  border-radius: 3px;
  padding: 3px;
  resize: none;
`;

const ChatSpaceContainer = styled.div`
  display: flex;
  border: 1px solid ${(p) => p.theme.colors.color1};
  border-radius: 3px;
  padding: 10px 3px 0;
  margin: 0 2px 200px;
  background: ${(p) => p.theme.colors.color2};
  max-height: calc(100vh - 60px - 250px);
`;

const AllMessagesContainer = styled.div`
  // height = 100vh - bottom - top - borders

  width: calc(100% - 120px);
  margin-bottom: 50px;
  overflow: scroll;
  display: flex;
  flex-direction: column-reverse;
`;

const AllUsersContainer = styled.div`
  width: 120px;
  padding-left: 10px;
  /* overflow: hidden; */
  border-left: ${(p) => p.theme.colors.color4} 1px solid;
  max-height: 100%;
`;

const AllOnlineUsersContainer = styled.div`
  padding-top: 5px;
  overflow: scroll;
  /* max-height: calc(100vh - 60px - 250px); */
`;

const CurUsersTitle = styled.div`
  color: ${(p) => p.theme.colors.color1};
  font-weight: bold;
`;

const UserName = styled.div`
  font-size: 12px;
`;

export const AppWs = ({
  ws,
  openSocket,
  receivedData,
  setReceivedData,
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
      {!reconnectingMsg && wsMessage && <div>{wsMessage}</div>}
      {reconnectingMsg && <div>{reconnectingMsg}</div>}
      {signedInUser && <div>Signed in as: {signedInUser}</div>}
      <ChatSpaceContainer>
        <AllMessagesContainer>
          {allMessages?.map((message, i) => {
            let time = moment
              .utc(message?.time)
              .local()
              .format("h:mm:ss a, D MMM YY");
            return (
              <MessageContainer key={message?.message + i + message?.time}>
                <div key={message?.time + message?.message}>
                  <MessageName>{message?.name}</MessageName>
                  <MessageTime>{time}</MessageTime>
                  <MessageContent>{message?.message}</MessageContent>
                </div>
              </MessageContainer>
            );
          })}
        </AllMessagesContainer>
        <AllUsersContainer>
          <div>
            <CurUsersTitle>Current users</CurUsersTitle>
            <AllOnlineUsersContainer>
              {!allUsers?.length ? (
                <UserName>...Nobody here</UserName>
              ) : (
                <>
                  {allUsers.map((usr, i) => {
                    return <UserName key={i + usr}>{usr}</UserName>;
                  })}
                </>
              )}
            </AllOnlineUsersContainer>
          </div>
        </AllUsersContainer>
      </ChatSpaceContainer>
      {/* <MsgForm onSubmit={handleSubmit}>
        <MsgInput onChange={handleChange} placeholder={"write a message"} />
      </MsgForm> */}
    </div>
  );
};
