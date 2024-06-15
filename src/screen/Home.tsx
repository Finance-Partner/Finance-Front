import { Form, Outlet, useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  householderIdState,
  myFlListsState,
  selectedLedgerIdState,
  userInfoState,
  invitedListsState,
  Ledger,
} from "../atom";
import { useEffect } from "react";

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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  -webkit-appearance: none; /* Remove number input arrow on Chrome/Safari */
  -moz-appearance: textfield; /* Remove number input arrow on Firefox */
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #7763f4;
  position: relative;
  overflow: hidden;
`;

const Circle = styled.div`
  position: absolute;
  right: -10vw;
  top: -10vw;
  width: 50vw;
  height: 50vw;
  border-radius: 50%;
  background-color: #f1956f;
  z-index: 1;
`;

const SecondCircle = styled.div`
  position: absolute;
  left: -55vw;
  top: -85vw;
  width: 140vw;
  height: 140vw;
  border-radius: 50%;
  background-color: none;
  border: 2px white solid;
  z-index: 1;
`;

const ThirdCircle = styled.div`
  position: absolute;
  right: -50vw;
  top: -75vw;
  width: 100vw;
  height: 100vw;
  border-radius: 50%;
  background-color: none;
  border: 2px solid white;
  z-index: 1;
`;

const Container = styled.div`
  display: grid;
  padding: 30px 30px;
  gap: 30px;
  grid-template-columns: 2fr 7fr;
  width: 90vw;
  height: 90vh;
  background-color: rgb(240, 240, 240);
  position: relative;
  border-radius: 30px;
  z-index: 2;
`;
const NavBar = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 30px;
`;
const OutletContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const DoubleIconContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;
const IconContaienr = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isActive ? "white" : "#7b7f85")};
  width: 6vw;
  height: 6vw;
  background-color: ${(props) => (props.isActive ? "#7763F4" : "white")};
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  cursor: pointer;
`;
const Icon = styled.span<{ isActive: boolean }>`
  width: 100%;
  text-align: center;
  font-size: 30px;
  color: ${(props) => (props.isActive ? "white" : "#7b7f85")};
`;
const IconP = styled.p`
  text-align: center;
  font-size: 10px;
  font-weight: bold;
  position: relative;
  top: 1px;
  width: 100%;
`;
const UserContainer = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const UserImg = styled.img`
  width: 7vw;
  height: 7vw;
  border-radius: 50%;
  background-color: black;
`;

const LedgerNav = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ArrowBtn = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
`;

const CircleBtnContainer = styled.div<{ isSelected: boolean; }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => (props.isSelected ? "#8B0000" : "#D2691E")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const CircleBtn: React.FC<{ isSelected: boolean; onClick: () => void; children: React.ReactNode }> = ({
  isSelected,
  onClick,
  children,
}) => (
  <CircleBtnContainer isSelected={isSelected} onClick={onClick}>
    {children}
  </CircleBtnContainer>
);

const AddManageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  gap: 15px;
`;

const AddManageBtn = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #ccc;
  font-size: 20px;
  cursor: pointer;
`;

const Home = () => {
  const dashboardMatch = useMatch("/home/dashboard");
  const householderdMatch = useMatch("/home/householder/:select");
  const budgetMatch = useMatch("/home/budget");
  const anaylsisMatch = useMatch("/home/analysis");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // const [householderId, setHouseholderId] = useRecoilState(householderIdState); // Recoil 상태 관리
  const [newFlName, setNewFlName] = useState("");

  const [newBudget, setNewBudget] = useState(0);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [myFlLists, setMyFlLists] = useRecoilState(myFlListsState);
  const [selectedLedgerId, setSelectedLedgerId] = useRecoilState(
    selectedLedgerIdState
  );
  const [startIndex, setStartIndex] = useState(0);
  const [invitedLists, setInvitedLists] = useRecoilState(invitedListsState);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedTap, setSelectedTap] = useState("profile");
  const [newUserName, setNewUserName] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [chkNewPwd, setChkNewPwd] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setHouseholderId(Number(e.target.value)); // 입력 값을 숫자로 변환하여 저장
  // };

  const handlePrev = () => {
    if (myFlLists.length === 0) return;
    const newIndex = (startIndex - 1 + myFlLists.length) % myFlLists.length;
    setStartIndex(newIndex);
  };

  const handleNext = () => {
    if (myFlLists.length === 0) return;
    const newIndex = (startIndex + 1) % myFlLists.length;
    setStartIndex(newIndex);
  };

  // 리스트를 원형 큐처럼 관리하여 보여주는 부분
  const renderLedgerButtons = () => {
    // startIndex를 기준으로 리스트를 잘라서 보여줌
    // 예를 들어 startIndex가 3이고 ledgerList의 길이가 5라면,
    // [3, 4, 0]을 보여주어야 함
    if (!myFlLists || myFlLists.length === 0) {
      return null;
    }

    const endIndex = (startIndex + 2) % myFlLists.length;
    const indicesToShow = [
      startIndex,
      (startIndex + 1) % myFlLists.length,
      (startIndex + 2) % myFlLists.length,
    ];

    return indicesToShow.map((index) => (
      <CircleBtn
        key={myFlLists[index].id}
        isSelected={myFlLists[index].id === selectedLedgerId}
        onClick={() => setSelectedLedgerId(myFlLists[index].id)}
      >
        {myFlLists[index].name.slice(0, 1)}
      </CircleBtn>
    ));
  };

  const handleAddFlList = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://43.201.7.157:8080/fl`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            budget: newBudget,
            title: newFlName,
          },
        }
      );

      setNewFlName("");
      setNewBudget(0);
      setShowModal(false);
      getUserInfo();
    } catch (error) {
      console.error("Error adding fixed expense:", error);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newUserName && newPwd && newPwd === chkNewPwd) {
      await updateProfile(newUserName, newPwd);

      if (file) {
        await uploadProfilePhoto(file);
      }
      setShowModal(false);
      setNewUserName("");
      setNewPwd("");
      setChkNewPwd("");
    } else {
      console.error("Password mismatch or missing fields");
    }
  };

  const handleLedgerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setShowModal(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

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
          // myFlLists 데이터 매핑
          setMyFlLists(data.myFlLists);

          // 리스트가 비어 있지 않을 때만 selectedLedgerId 설정
          if (myFlLists.length > 0) {
            setSelectedLedgerId(data.myFlLists[0].id);
          } else {
            setSelectedLedgerId(null);
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

  const updateProfile = async (name: string, password: string) => {
    try {
      await axios.patch(
        "http://43.201.7.157:8080/user",
        { name, password },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Profile updated successfully");
      // 프로필 정보가 업데이트된 후에 필요한 추가 작업 수행
      // 예: 사용자 정보 다시 불러오기
      getUserInfo();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const uploadProfilePhoto = async (img: File) => {
    try {
      const formData = new FormData();
      formData.append("img", img);

      await axios.post(`http://43.201.7.157:8080/photo`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile photo uploaded successfully");
      // 프로필 사진 업로드 후에 필요한 추가 작업 수행
      // 예: 사용자 정보 다시 불러오기
      getUserInfo();
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    }
  };

  
  useEffect(() => {
    getUserInfo();
  }, [token, setMyFlLists, setSelectedLedgerId]);

  return (
    <div style={{ overflow: "hidden" }}>
      <Wrapper>
        <Circle />
        <SecondCircle />
        <ThirdCircle />
        <Container>
          <NavBar>
            <p
              style={{
                width: "100%",
                fontSize: "35px",
                textAlign: "center",
                marginTop: "15px",
                color: "#7763f4",
              }}
              className="material-symbols-outlined"
            >
              payments
            </p>
            <p
              style={{
                width: "100%",
                fontSize: "23px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Financial
              <br />
              Partners
            </p>
            <DoubleIconContainer>
              <IconContaienr
                onClick={() => navigate("/home/dashboard")}
                isActive={dashboardMatch != null}
              >
                <div>
                  <Icon
                    isActive={dashboardMatch != null}
                    className="material-symbols-outlined"
                  >
                    home
                  </Icon>
                  <IconP>대시보드</IconP>
                </div>
              </IconContaienr>
              <IconContaienr
                onClick={() => navigate("/home/householder/overview")}
                isActive={householderdMatch != null}
              >
                <div>
                  <Icon
                    isActive={householderdMatch != null}
                    className="material-symbols-outlined"
                  >
                    credit_card
                  </Icon>
                  <IconP>가계부</IconP>
                </div>
              </IconContaienr>
            </DoubleIconContainer>
            <DoubleIconContainer>
              <IconContaienr
                onClick={() => navigate("/home/budget")}
                isActive={budgetMatch != null}
              >
                <div>
                  <Icon
                    isActive={budgetMatch != null}
                    className="material-symbols-outlined"
                  >
                    savings
                  </Icon>
                  <IconP>예산</IconP>
                </div>
              </IconContaienr>
              <IconContaienr
                onClick={() => navigate("/home/analysis")}
                isActive={anaylsisMatch != null}
              >
                <div>
                  <Icon
                    isActive={anaylsisMatch != null}
                    className="material-symbols-outlined"
                  >
                    bar_chart
                  </Icon>
                  <IconP>분석</IconP>
                </div>
              </IconContaienr>
            </DoubleIconContainer>
            <UserContainer>
              <UserImg
                src={userInfo?.photo != null ? userInfo.photo : ""}
                alt="프로필 이미지"
              />
            </UserContainer>
            <p
              style={{
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "15px",
                marginTop: "5px",
              }}
            >
              {userInfo?.name}
            </p>
            <AddManageContainer>
              <div
                style={{
                  marginTop: "5px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{ marginRight: "15px", cursor: "pointer" }}
                    onClick={() => {
                      setShowModal(true);
                      setModalType("setting");
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
                      settings
                    </p>
                    <p style={{ fontSize: "10px", textAlign: "center" }}>
                      설정
                    </p>
                  </div>
                  <div
                    style={{ marginRight: "15px", cursor: "pointer" }}
                    onClick={() => {
                      setShowModal(true);
                      setModalType("createFl");
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
                      add
                    </p>
                    <p style={{ fontSize: "10px", textAlign: "center" }}>
                      가계부 생성
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      navigate("/");
                      localStorage.removeItem("token");
                    }}
                    style={{ cursor: "pointer" }}
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
                    <p style={{ fontSize: "10px", textAlign: "center" }}>
                      로그아웃
                    </p>
                  </div>
                </div>
              </div>
            </AddManageContainer>

            <LedgerNav>
              <ArrowBtn onClick={handlePrev}>&lt;</ArrowBtn>
              {renderLedgerButtons()}
              <ArrowBtn onClick={handleNext}>&gt;</ArrowBtn>
            </LedgerNav>
          </NavBar>

          <OutletContainer>
            <Outlet />
          </OutletContainer>
          <ModalOverlay show={showModal}>
            <ModalContent>
              {modalType === "createFl" ? (
                <>
                  <ModalTitle>가계부 생성</ModalTitle>
                  <FormContainer onSubmit={handleAddFlList}>
                    <Input
                      type="text"
                      placeholder="이름"
                      value={newFlName}
                      onChange={(e) => setNewFlName(e.target.value)}
                      required
                    />
                    <Input
                      type="number"
                      placeholder="가계부 예산"
                      value={newBudget}
                      onChange={(e) => setNewBudget(Number(e.target.value))}
                      required
                    />
                    <AddButton type="submit">가계부 생성</AddButton>
                    <EditButton onClick={() => setShowModal(false)}>
                      닫기
                    </EditButton>
                  </FormContainer>
                </>
              ) : (
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
                    <FormContainer onSubmit={handleLedgerSubmit}>
                      <Input
                        type="text"
                        placeholder="가계부 이름"
                        value={newFlName}
                        onChange={(e) => setNewFlName(e.target.value)}
                        required
                      />
                      <Input
                        type="number"
                        placeholder="예산"
                        value={newBudget}
                        onChange={(e) => setNewBudget(Number(e.target.value))}
                        required
                      />
                      <div style={{ display: "flex" }}>
                        <AddButton type="submit">수정</AddButton>
                        <EditButton onClick={() => setShowModal(false)}>
                          닫기
                        </EditButton>
                      </div>
                    </FormContainer>
                  ) : (
                    <FormContainer onSubmit={handleProfileSubmit}>
                      <Input type="file" onChange={handleFileChange} />

                      <Input
                        type="text"
                        placeholder="이름"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        required
                      />
                      <Input
                        type="password"
                        value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)}
                        required
                      />
                      <Input
                        type="password"
                        value={chkNewPwd}
                        onChange={(e) => setChkNewPwd(e.target.value)}
                        required
                      />
                      <AddButton type="submit">수정 완료</AddButton>
                      <EditButton
                        onClick={() => {
                          setShowModal(false);
                          setNewUserName("");
                          setNewPwd("");
                          setChkNewPwd("");
                        }}
                      >
                        닫기
                      </EditButton>
                    </FormContainer>
                  )}
                </>
              )}
            </ModalContent>
          </ModalOverlay>
        </Container>
      </Wrapper>
    </div>
  );
};

export default Home;
