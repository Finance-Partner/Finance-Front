import React from "react";
import styled from "styled-components";
import ProfileForm from "./ProfileForm";
import CreateLedgerForm from "./CreateLedgerForm";
import { Ledger } from "../../atom";
import EditLedgerForm from "./EditLedgerForm";
import InviteUserForm from "./InviteUserForm";
import logo from "../../img/moayoLogo2.png";

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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-height: 80%;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 10px;
  background-color: ${({ isActive }) => (isActive ? "#7763f4" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "#7763f4")};
  border: 1px solid #7763f4;
  cursor: pointer;
`;

const AddButton = styled.button`
  padding: 10px;
  font-size: 14px;
  background-color: #7763f4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
`;

const LogoutContainer = styled.div`
  padding: 20px;
  text-align: center;
`

interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: string;
  selectedTap: string;
  setSelectedTap: React.Dispatch<React.SetStateAction<string>>;
  newUserName: string;
  setNewUserName: React.Dispatch<React.SetStateAction<string>>;
  newPwd: string;
  setNewPwd: React.Dispatch<React.SetStateAction<string>>;
  chkNewPwd: string;
  setChkNewPwd: React.Dispatch<React.SetStateAction<string>>;
  file: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getUserInfo: () => void;
  navigate: (path: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  modalType,
  selectedTap,
  setSelectedTap,
  newUserName,
  setNewUserName,
  newPwd,
  setNewPwd,
  chkNewPwd,
  setChkNewPwd,
  file,
  handleFileChange,
  getUserInfo,
  navigate,
}) => {
  return (
    <ModalOverlay show={showModal}>
      <ModalContent>
        {modalType === "createFl" && (
          <>
            <ModalTitle>가계부 생성</ModalTitle>
            <CreateLedgerForm
              getUserInfo={getUserInfo}
              setShowModal={setShowModal}
            />
          </>
        )}
        {modalType === "setting" && (
          <>
            <TabContainer>
              <TabButton
                isActive={selectedTap === "profile"}
                onClick={() => setSelectedTap("profile")}
              >
                프로필 수정
              </TabButton>
              <TabButton
                isActive={selectedTap === "ledger"}
                onClick={() => setSelectedTap("ledger")}
              >
                가계부 수정
              </TabButton>
            </TabContainer>
            {selectedTap === "ledger" ? (
              <EditLedgerForm
                getUserInfo={getUserInfo}
                setShowModal={setShowModal}
              />
            ) : (
              <ProfileForm
                newUserName={newUserName}
                setNewUserName={setNewUserName}
                newPwd={newPwd}
                setNewPwd={setNewPwd}
                chkNewPwd={chkNewPwd}
                setChkNewPwd={setChkNewPwd}
                file={file}
                handleFileChange={handleFileChange}
                setShowModal={setShowModal}
                getUserInfo={getUserInfo}
              />
            )}
          </>
        )}
        {modalType === "logout" && (
          <LogoutContainer>
            <img src={logo} width="100"></img>
            <ModalTitle>로그아웃하시겠습니까?</ModalTitle>
            <div style={{display: "flex"}}>
            <EditButton
              onClick={() => {setShowModal(false)}}
              >
                닫기
              </EditButton>
            <AddButton
              onClick={() => {
                navigate("/");
                localStorage.removeItem("token");
                setShowModal(false);
              }}
            >
              로그아웃
            </AddButton>
            </div>

          </LogoutContainer>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
