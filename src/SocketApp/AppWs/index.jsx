import React, { useState } from "react";
import styled from "@emotion/styled";
import moment from "moment";
import { mq } from "../theme";

const MessageContainer = styled.div`
  padding: 0 5px;
  color: ${(p) => p.theme.colors.color3};
  /* background: ${(p) =>
    p.indexNum % 2 === 0 ? p.theme.colors.color2Lighter : "none"}; */
`;

const MessageName = styled.span`
  color: ${(p) => p.theme.colors.color3};
  color: ${(p) => p.isYou && p.theme.colors.color1};
  font-weight: ${(p) => (p.isYou ? "bolder" : "bold")};
  font-size: 12px;
  padding: 15px 15px 0 0;
  display: inline-block;
`;

const MessageTime = styled.span`
  color: ${(p) => p.theme.colors.color4};
  font-size: 11px;
`;

const MessageContent = styled.div`
  padding: 2px 0;
  font-size: 12px;
  line-height: 15px;
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
  border-radius: 3px;
  padding: 10px 3px;
  resize: none;
  margin: 0 3px;
  background: ${(p) => p.theme.colors.color5};
  color: ${(p) => p.theme.colors.color3};
`;

const AllChat = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${(p) => p.theme.colors.color2};
`;

const ChatSpaceContainer = styled.div`
  display: flex;
  border: 1px solid ${(p) => p.theme.colors.color1};
  border-radius: 3px;
  /* padding: 0 5px 0; */
  margin: 0 5px;
  background: white;
  height: calc(100vh - 60px - 90px);
`;

const AllMessagesContainer = styled.div`
  width: calc(100% - 120px);
  /* overflow: scroll; */
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  background: ${(p) => p.theme.colors.color5};
  scrollbar-color: ${(p) =>
    `${p.theme.colors.color5} ${p.theme.colors.color4}`};
  ::-webkit-scrollbar {
    background: ${(p) => p.theme.colors.color4};
  }
  ::-webkit-scrollbar-thumb {
    background: ${(p) => p.theme.colors.color5};
    border-radius: 10px;
    border: ${(p) => p.theme.colors.color4} 1px solid;
  }
`;

const AllUsersContainer = styled.div`
  width: 120px;
  padding-left: 10px;
  overflow-y: hidden;
  border-left: ${(p) => p.theme.colors.color4} 1px solid;
  ${mq[2]} {
    width: 75px;
    font-size: 10px;
  }
  background: ${(p) => p.theme.colors.color5};
  color: ${(p) => p.theme.colors.color3};
`;

const AllOnlineUsersContainer = styled.div`
  padding-top: 5px;
  padding-bottom: 50px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  scrollbar-color: ${(p) =>
    `${p.theme.colors.color5} ${p.theme.colors.color4}`};
  ::-webkit-scrollbar {
    background: ${(p) => p.theme.colors.color4};
  }
  ::-webkit-scrollbar-thumb {
    background: ${(p) => p.theme.colors.color5};
    border-radius: 10px;
    border: ${(p) => p.theme.colors.color4} 1px solid;
  }
`;

// const CurUsersTitle = styled.div`
//   color: ${(p) => p.theme.colors.color1};
//   font-weight: bold;
//   padding-bottom: 5px;
//   /* position: fixed; */
// `;

const UserName = styled.div`
  font-size: 12px;
  white-space: nowrap;
  font-weight: ${(p) => (p.isYou ? "bold" : "normal")};
  /* text-decoration: ${(p) => p.isYou && "underline"}; */
  ${mq[2]} {
    /* width: 75px; */
    font-size: 10px;
  }
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
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
                  let nextIsSame = allMessages[i + 1]?.name === message.name;
                  let time = moment
                    .utc(message?.time)
                    .local()
                    .format("h:mm:ss a, D MMM YY");
                  return (
                    <MessageContainer
                      key={message?.message + i + message?.time}
                      indexNum={i}
                    >
                      <div key={message?.time + message?.message}>
                        {!nextIsSame && (
                          <>
                            <MessageName isYou={message?.name === signedInUser}>
                              {message?.name}
                            </MessageName>
                            <MessageTime>{time}</MessageTime>
                          </>
                        )}
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
            <AllOnlineUsersContainer>
              {/* <CurUsersTitle>Current users</CurUsersTitle> */}
              {signedInUser && !allUsers?.length ? (
                <UserName>...Nobody here</UserName>
              ) : !signedInUser && !allUsers?.length ? (
                <UserName>Please Login</UserName>
              ) : (
                <>
                  {allUsers.map((usr, i) => {
                    return (
                      <UserName key={i + usr} isYou={usr === signedInUser}>
                        {/* {usr === signedInUser ? `${usr} (you)` : usr} */}
                        {usr === signedInUser ? `⭐️ ${usr}` : usr}
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
