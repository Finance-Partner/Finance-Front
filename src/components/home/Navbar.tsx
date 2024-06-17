import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { myFlListsState, selectedLedgerState, userInfoType } from "../../atom";
import { useMatch } from "react-router-dom";
import Notification from "./Notification";

const NavBarContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 30px;
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

const CircleBtnContainer = styled.div<{ isSelected: boolean }>`
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

const AddManageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  gap: 15px;
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

const CircleBtn: React.FC<{
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ isSelected, onClick, children }) => (
  <CircleBtnContainer isSelected={isSelected} onClick={onClick}>
    {children}
  </CircleBtnContainer>
);

// Prop 타입 정의
interface NavBarProps {
  logo: string;
  navigate: (path: string) => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  userInfo: userInfoType | null;
  getUserInfo: () => void;
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
}

const NavBar:React.FC<NavBarProps> = ({
  logo,
  navigate,
  setShowModal,
  setModalType,
  userInfo,
  getUserInfo,
  startIndex,
  setStartIndex,
}) => {
  const dashboardMatch = useMatch("/home/dashboard");
  const householderdMatch = useMatch("/home/householder/:select");
  const budgetMatch = useMatch("/home/budget");
  const anaylsisMatch = useMatch("/home/analysis");
  const [myFlLists, setMyFlLists] = useRecoilState(myFlListsState);
  const [selectedLedger, setSelectedLedger] = useRecoilState(selectedLedgerState);

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

  const renderLedgerButtons = () => {
    if (!myFlLists || myFlLists.length === 0) {
      return null;
    }

    const endIndex = Math.min(myFlLists.length, 3);
    const indicesToShow = Array.from(
      { length: endIndex },
      (_, i) => (startIndex + i) % myFlLists.length
    );

    return indicesToShow.map((index) => (
      <CircleBtn
        key={myFlLists[index].id}
        isSelected={myFlLists[index] === selectedLedger}
        onClick={() => setSelectedLedger(myFlLists[index])}
      >
        {myFlLists[index].name.slice(0, 1)}
      </CircleBtn>
    ));
  };

  return (
    <NavBarContainer>
      <img
        src={logo}
        style={{
          width: "3em",
          fontSize: "35px",
          textAlign: "center",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "15px",
          color: "#7763f4",
        }}
      ></img>
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
        <UserImg src={userInfo?.photo != null ? userInfo.photo : ""} alt="프로필 이미지" />
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
            {/* <div
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
              <p style={{ fontSize: "10px", textAlign: "center" }}>알림</p>
            </div> */}
            <Notification getUserInfo={getUserInfo}/>
            <div
              style={{ cursor: "pointer" }}
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
              <p style={{ fontSize: "10px", textAlign: "center" }}>설정</p>
            </div>

            <div
              onClick={() => {setShowModal(true); setModalType("logout")}}
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
                logout
              </p>
              <p style={{ fontSize: "10px", textAlign: "center" }}>로그아웃</p>
            </div>
          </div>
        </div>
      </AddManageContainer>

      <LedgerNav>
        <ArrowBtn onClick={handlePrev}>
          <p
            style={{
              width: "100%",
              textAlign: "center",
              color: "#7B7F85",
              fontSize: "32px",
            }}
            className="material-symbols-outlined"
          >
            chevron_left
          </p>
        </ArrowBtn>
        {renderLedgerButtons()}
        <ArrowBtn onClick={handleNext}>
          <p
            style={{
              width: "100%",
              textAlign: "center",
              color: "#7B7F85",
              fontSize: "32px",
            }}
            className="material-symbols-outlined"
          >
            chevron_right
          </p>
        </ArrowBtn>
      </LedgerNav>
      <AddManageContainer>
        <div
          style={{ marginRight: "5px", cursor: "pointer" }}
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
            add_circle
          </p>
          <p style={{ fontSize: "10px", textAlign: "center" }}>가계부 생성</p>
        </div>
      </AddManageContainer>
    </NavBarContainer>
  );
};

export default NavBar;
