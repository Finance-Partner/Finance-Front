// ChatDropdown.tsx
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { Ledger, selectedLedgerState, userInfoState } from "../../atom";
import { useRecoilState } from "recoil";
import profileImg from "../../img/basicUserImg.png";

const DropdownContainer = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? "block" : "none")};
  position: relative;
`;

const DropdownButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 400px;
  height: 500px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 5;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const ChatTitle = styled.div`
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const MessageList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const MessageContainer = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: ${({ isMine }) => (isMine ? "row-reverse" : "row")};
  align-items: flex-start;
  margin-bottom: 10px;
`;

const MessageContent = styled.div`
  background-color: #f1f0f0;
  border-radius: 10px;
  padding: 10px;
  max-width: 200px;
  word-wrap: break-word;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px;
`;

const MessageText = styled.p`
  margin: 0;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  padding: 10px 0;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  background-color: #7763f4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface Message {
  content: string;
  name: string;
  photo: string;
  userId: number;
  time: string;
}

interface ChatDropdownProps {
  fl: Ledger;
}

const ChatDropdown: React.FC<ChatDropdownProps> = ({ fl }) => {
  const messageListRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedLedger, setSelectedLedger] =
    useRecoilState(selectedLedgerState);
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useRecoilState(userInfoState); // Assuming userId is stored in localStorage

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showDropdown) {
      fetchMessages(); // Fetch messages initially when dropdown is shown
      interval = setInterval(() => {
        fetchMessages();
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [selectedLedger, showDropdown]);


  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://43.201.7.157:8080/notice?flId=${fl.id}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    try {
      await axios.post(
        `http://43.201.7.157:8080/notice?flId=${fl.id}&content=${newMessage}`,
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewMessage("");
      fetchMessages();
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <DropdownButton onClick={() => setShowDropdown(!showDropdown)}>
        <p
          style={{
            width: "100%",
            textAlign: "center",
            color: "#7B7F85",
            fontSize: "32px",
          }}
          className="material-symbols-outlined"
        >
          chat
        </p>
      </DropdownButton>
      <DropdownContainer show={showDropdown}>
        <DropdownContent>
          <ChatTitle>{fl.name} 가계부</ChatTitle>
          <MessageList ref={messageListRef}>
            {messages.map((message) => (
              <MessageContainer
                key={message.time}
                isMine={message.userId === userInfo?.userId}
              >
                {!(message.userId === userInfo?.userId) && (
                  <UserImage src={message.photo ? message.photo : profileImg} alt={message.name} />
                )}
                <MessageContent>
                  {!(message.userId === userInfo?.userId) && (
                    <MessageText>
                      <strong>{message.name}</strong>
                    </MessageText>
                  )}
                  <MessageText>{message.content}</MessageText>
                </MessageContent>
              </MessageContainer>
            ))}
          </MessageList>
          <ChatInputContainer>
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="채팅 메시지"
              onKeyPress={handleKeyPress}
            />
            <SendButton onClick={handleSendMessage}>전송</SendButton>
          </ChatInputContainer>
        </DropdownContent>
      </DropdownContainer>
    </>
  );
};

export default ChatDropdown;
