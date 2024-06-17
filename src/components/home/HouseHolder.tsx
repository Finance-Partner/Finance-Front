import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Ledger, invitedListsState, myFlListsState, myManageFlListsState, selectedLedgerState, userInfoState } from "../../atom";
import { useEffect, useState } from "react";
import InviteUserForm from "./InviteUserForm";
import axios from "axios";
import logo from "../../img/moayoLogo2.png";
import ChatDropdown from "./ChatDropDown";

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

const ModalTitle = styled.h2`
  margin-bottom: 20px;
`;

const EditButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
`;

const LeaveContainer = styled.div`
  padding: 20px;
  text-align: center;
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

  const token = localStorage.getItem("token");

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [myFlLists, setMyFlLists] = useRecoilState(myFlListsState);
  const [selectedLedger, setSelectedLedger] = useRecoilState(selectedLedgerState);
  const [myManageFlLists, setMyManageFlLists] =useRecoilState(myManageFlListsState);
  const [invitedLists, setInvitedLists] = useRecoilState(invitedListsState);

  // 유저 초대 관련 상태
  const [inviteEmail, setInviteEmail] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [fl, setFl] = useRecoilState(selectedLedgerState);

  const [isMyManageFlList, setIsMyManageFlList] = useState<boolean>(false);

  const getUserInfo = () => {
    if (token) {
      axios
        .get(`http://43.201.7.157:8080/user`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          setMyFlLists(data.myFlLists);
          setMyManageFlLists(data.myManageFlLists);
          setInvitedLists(data.invitedLists);
          if (myFlLists.length > 0) {
            setSelectedLedger(data.myFlLists[0]);
          }
          setUserInfo({
            name: data.name,
            photo: data.photo,
            userId: data.userId,
            email: data.email,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };


  useEffect(() => {
    const fetchTeamData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://43.201.7.157:8080/fl/users`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            flId: fl.id,
          },
        });
        setFlUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, [fl]);

  useEffect(() => {
    if (fl && myManageFlLists) {
      const isManaged = myManageFlLists.some((item) => item.id === fl.id);
      setIsMyManageFlList(isManaged);
    }
  }, [fl, myManageFlLists]);

  const handleLeaveFl = () => {
    const fetchLeaveFl = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(
          `http://43.201.7.157:8080/fl/quit`,
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
        getUserInfo();
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchLeaveFl();
  };

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
            <div style={{display: "flex" }}>
              {isMyManageFlList ? (
                <div
                  style={{ marginRight: "15px", cursor: "pointer" }}
                  onClick={() => {
                    setShowModal(true);
                    setModalType("leaveFl");
                  }}
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
                    close
                  </p>
                </div>
              ) : (
                <></>
              )}

              <div
                style={{ marginRight: "15px", cursor: "pointer" }}
                onClick={() => {
                  setShowModal(true);
                  setModalType("leaveFl");
                }}
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
                  logout
                </p>
              </div>
              {isMyManageFlList && (
                <div
                  style={{ marginRight: "15px", cursor: "pointer" }}
                  onClick={() => {
                    setShowModal(true);
                    setModalType("invite");
                  }}
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
              )}

              <ChatDropdown fl={fl}/>
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
        {modalType === "invite" && (
          <ModalContent>
            <InviteUserForm
              showModal={showModal}
              modalType={modalType}
              flUserInfo={flUserInfo}
            />
          </ModalContent>
        )}
        {modalType === "leaveFl" && (
          <ModalContent>
            {isMyManageFlList ? (
              <>
                <LeaveContainer>
                  <img src={logo} width="100"></img>
                  <ModalTitle>
                    가계부에서 나가시겠습니까?
                    <br />
                    *방장이 나갈 경우 가계부가 삭제됩니다*
                  </ModalTitle>
                  <div style={{ display: "flex" }}>
                    <EditButton
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      닫기
                    </EditButton>
                    <AddButton
                      onClick={() => {
                        handleLeaveFl();
                        setShowModal(false);
                      }}
                    >
                      나가기
                    </AddButton>
                  </div>
                </LeaveContainer>
              </>
            ) : (
              <>
                <LeaveContainer>
                  <img src={logo} width="100"></img>
                  <ModalTitle>가계부에서 나가시겠습니까?</ModalTitle>
                  <div style={{ display: "flex" }}>
                    <EditButton
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      닫기
                    </EditButton>
                    <AddButton
                      onClick={() => {
                        setShowModal(false);
                        handleLeaveFl();
                      }}
                    >
                      나가기
                    </AddButton>
                  </div>
                </LeaveContainer>
              </>
            )}
          </ModalContent>
        )}
        {modalType === "kickUser" && (
          <>

          </>
        )}
      </ModalOverlay>
    </Wrapper>
  );
};
export default HouseHolder;
