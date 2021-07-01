import React, { useState } from "react";
import styled from "@emotion/styled";
import moment from "moment";
import { mq } from "../theme";

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
  width: 100%;
  height: 60px;
  margin: 0;
  padding: 10px 0 0;
  background: ${(p) => p.theme.colors.color2};
`;

const MsgInput = styled.input`
  width: calc(100% - 6px);
  background: white;
  border-radius: 3px;
  padding: 10px 3px;
  resize: none;
  margin: 0 3px;
`;

const AllChat = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${(p) => p.theme.colors.color2};
`;

const UserInformation = styled.div``;

const ChatSpaceContainer = styled.div`
  display: flex;
  border: 1px solid ${(p) => p.theme.colors.color1};
  border-radius: 3px;
  padding: 10px 5px 10px;
  margin: 0 5px;
  background: white;
  height: calc(100vh - 60px - 90px);
`;

const AllMessagesContainer = styled.div`
  width: calc(100% - 120px);
  overflow: scroll;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
`;

const AllUsersContainer = styled.div`
  width: 120px;
  padding-left: 10px;
  overflow: hidden;
  border-left: ${(p) => p.theme.colors.color4} 1px solid;
  ${mq[2]} {
    width: 75px;
    font-size: 10px;
  }
`;

const AllOnlineUsersContainer = styled.div`
  padding-top: 5px;
  padding-bottom: 50px;
  overflow: scroll;
  overflow-x: hidden;
  max-height: 100%;
  /* max-height: calc(100vh - 60px - 250px); */
`;

const CurUsersTitle = styled.div`
  color: ${(p) => p.theme.colors.color1};
  font-weight: bold;
  padding-bottom: 5px;
  /* position: fixed; */
`;

const UserName = styled.div`
  font-size: 12px;
  font-weight: ${(p) => (p.isYou ? "bold" : "normal")};
  ${mq[2]} {
    /* width: 75px; */
    font-size: 10px;
  }
`;

export const AppWs = (props) => {
  const { ws, reconnectingMsg, allMessages, allUsers, signedInUser } = props;
  const [messageValue, setMessageValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const jsonObject = JSON.stringify({
      message: messageValue,
    });
    ws?.current?.send && ws?.current?.send(jsonObject);

    setMessageValue("");
  };

  const handleChange = (e) => {
    setMessageValue(e.target.value);
  };

  return (
    <AllChat>
      <>
        <ChatSpaceContainer>
          <AllMessagesContainer>
            {!!allMessages?.length
              ? allMessages?.map((message, i) => {
                  let time = moment
                    .utc(message?.time)
                    .local()
                    .format("h:mm:ss a, D MMM YY");
                  return (
                    <MessageContainer
                      key={message?.message + i + message?.time}
                    >
                      <div key={message?.time + message?.message}>
                        <MessageName>{message?.name}</MessageName>
                        <MessageTime>{time}</MessageTime>
                        <MessageContent>{message?.message}</MessageContent>
                      </div>
                    </MessageContainer>
                  );
                })
              : reconnectingMsg && (
                  <MessageContainer>
                    <MessageName>From the server</MessageName>
                    <MessageContent>{reconnectingMsg}</MessageContent>
                  </MessageContainer>
                )}
          </AllMessagesContainer>
          <AllUsersContainer>
            <CurUsersTitle>Current users</CurUsersTitle>
            <AllOnlineUsersContainer>
              {signedInUser && !allUsers?.length ? (
                <UserName>...Nobody here</UserName>
              ) : !signedInUser && !allUsers?.length ? (
                <UserName>Please Login</UserName>
              ) : (
                <>
                  {allUsers.map((usr, i) => {
                    console.log(usr, signedInUser);
                    return (
                      <UserName key={i + usr} isYou={usr === signedInUser}>
                        {usr === signedInUser ? `${usr} (you)` : usr}
                      </UserName>
                    );
                  })}
                </>
              )}
            </AllOnlineUsersContainer>
          </AllUsersContainer>
        </ChatSpaceContainer>
        <MsgForm onSubmit={handleSubmit}>
          <MsgInput
            onChange={handleChange}
            placeholder={"write a message"}
            value={messageValue}
          />
        </MsgForm>
      </>
    </AllChat>
  );
};
