// Notification.tsx
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { invitedListsState, selectedLedgerState } from "../../atom";
import axios from "axios";

const NotificationContainer = styled.div`
  position: relative;
`;

const NotificationIcon = styled.div`
  margin-right: 15px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

const NotificationList = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? "block" : "none")};
  position: absolute;
  top: 50px;
  left: 0px;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 10;
`;

const NotificationItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  cursor: pointer; /* 커서 모양 변경 */
  &:hover {
    background-color: rgba(0, 0, 0, 0.1); /* 배경 흐려짐 */
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationBottom = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationIconItem = styled.div`
  margin-right: 10px;
  font-size: 20px;
`;

const NotificationContent = styled.div`
  flex-grow: 1;
`;

const NotificationHeader = styled.div`
  font-weight: bold;
`;

const NotificationTime = styled.div`
  color: #999;
  font-size: 12px;
`;

const ModalOverlay = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
`;

interface NotificationProps {
  getUserInfo: () => void;
}

const Notification: React.FC<NotificationProps> = ({ getUserInfo }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [invitedLists, setInvitedLists] = useRecoilState(invitedListsState);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const token = localStorage.getItem("token");

  const handleIconClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleItemClick = (notification: any) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const handleAccept = async () => {
    if (!selectedNotification) return;
    try {
      await axios.post(
        `http://43.201.7.157:8080/fl/invite/accept/${selectedNotification.id}`,
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // 성공 시 초대 리스트에서 제거
      setInvitedLists((prev) =>
        prev.filter((item) => item.id !== selectedNotification.id)
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error accepting invite:", error);
    }
    getUserInfo();
    setShowNotifications(false);
    setShowModal(false);
  };

  const handleReject = async () => {
    if (!selectedNotification) return;
    try {
      await axios.post(
        `http://43.201.7.157:8080/fl/invite/reject/${selectedNotification.id}`,
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // 성공 시 초대 리스트에서 제거
      setInvitedLists((prev) =>
        prev.filter((item) => item.id !== selectedNotification.id)
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error rejecting invite:", error);
    }
    getUserInfo();
    setShowNotifications(false);
    setShowModal(false);
  };

  return (
    <>
      <NotificationContainer>
        <NotificationIcon onClick={handleIconClick}>
          <p
            style={{
              width: "100%",
              textAlign: "center",
              color: "#7B7F85",
              fontSize: "32px",
            }}
            className="material-symbols-outlined"
          >
            notifications
          </p>
          <p style={{ fontSize: "10px", textAlign: "center" }}>알림</p>
        </NotificationIcon>
        <NotificationList className="notification-list" show={showNotifications}>
          {invitedLists.length <= 0 ? (
            <NotificationBottom>
              <NotificationContent style={{ textAlign: "center" }}>
                알림이 없습니다
              </NotificationContent>
            </NotificationBottom>
          ) : (
            <>
              {invitedLists.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  onClick={() => handleItemClick(notification)}
                >
                  <NotificationIconItem>🔔</NotificationIconItem>
                  <NotificationContent>
                    <NotificationHeader>{notification.name}</NotificationHeader>
                    <div>가계부에 초대되셨어요</div>
                  </NotificationContent>
                </NotificationItem>
              ))}
              <NotificationBottom>
                <NotificationContent style={{ textAlign: "center" }}>
                  All Notifications
                </NotificationContent>
              </NotificationBottom>
            </>
          )}
        </NotificationList>
      </NotificationContainer>
      <ModalOverlay show={showModal}>
        <ModalContent>
          <p>{selectedNotification?.name} 가계부에 초대되었습니다.</p>
          <Button onClick={handleAccept}>수락</Button>
          <Button onClick={handleReject}>거절</Button>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default Notification;
