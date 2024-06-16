import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { selectedLedgerState } from "../../atom";
import { useEffect, useState } from "react";
import InviteUserForm from "./InviteUserForm";
import axios from "axios";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const ButtonContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
`;
const Btn = styled.button<{ isActive: boolean }>`
  width: 130px;
  height: 80%;
  margin-right: 20px;
  border-radius: 40px;
  background-color: white;
  color: ${(props) => (props.isActive ? "#7763F4" : "#7b7f85")};
  border: 1px solid ${(props) => (props.isActive ? "#7763F4" : "#7b7f85")};
  cursor: pointer;
`;
const SubmitBtn = styled.button`
  width: 150px;
  height: 80%;
  margin-right: 20px;
  border-radius: 40px;
  border: none;
  background-color: #7763f4;
  color: white;
  font-weight: bold;
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
const OutletContainer = styled.div`
  width: 100%;
  height: 90%;
`;

const HouseHolderManageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

// 모달 레이아웃 CSS
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


interface TeammateInfo {
  userId: number;
  name: string;
  photo: string;
  head: boolean;
}

const HouseHolder = () => {
  const navigate = useNavigate();
  const overviewMatch = useMatch("/home/householder/overview");
  const detaildMatch = useMatch("/home/householder/detail");
  const [flUserInfo, setFlUserInfo] = useState<TeammateInfo[]>([]);

  // 유저 초대 관련 상태
  const [inviteEmail, setInviteEmail] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [fl, setFl] = useRecoilState(selectedLedgerState);

  useEffect(() => {
    const fetchTeamData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://43.201.7.157:8080/fl/users`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: {
              flId: fl.id,
            },
          }
        );
        setFlUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, [fl]);
  return (
    <Wrapper>
      <ButtonContainer>
        <div>
          <Btn
            onClick={() => navigate("/home/householder/overview")}
            isActive={overviewMatch != null}
          >
            {fl.name} 가계부
          </Btn>
          <Btn
            onClick={() => navigate("/home/householder/detail")}
            isActive={detaildMatch != null}
          >
            내역
          </Btn>
        </div>
        <HouseHolderManageContainer>
              <div
                style={{
                  marginBottom: "15px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ display: "flex" }}>
                <div
                    style={{ marginRight: "15px", cursor: "pointer" }}
                  >
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
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowModal(true)} 
                  >
                    <p
                      style={{
                        width: "100%",
                        textAlign: "center",
                        color: "#7B7F85",
                        fontSize: "32px",
                      }}
                      className="material-symbols-outlined"
                    >
                      person_add
                    </p>

                  </div>

                  <div
                    style={{ marginLeft: "15px", cursor: "pointer" }}
                  >
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
                  </div>
                </div>
              </div>
            </HouseHolderManageContainer>
        {/* <SubmitBtn>가계부 작성하기</SubmitBtn>  */}
        {/* 나중에 useOutletContext 사용해서 제출버튼 전송 */}
      </ButtonContainer>

      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <ModalOverlay show={showModal}>
        <ModalContent>
            <InviteUserForm
              showModal={showModal}
              modalType={modalType}
              flUserInfo={flUserInfo}
            />
        </ModalContent>
      </ModalOverlay>
    </Wrapper>
  );
};
export default HouseHolder;
