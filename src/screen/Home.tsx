import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Outlet, useNavigate, useMatch } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import {
  householderIdState,
  myFlListsState,
  selectedLedgerState,
  userInfoState,
  invitedListsState,
  myManageFlListsState,
} from "../atom";
import NavBar from "../components/home/Navbar";
import Modal from "../components/home/Modal";
import logo from "../img/moayoLogo2.png";

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

const OutletContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [myFlLists, setMyFlLists] = useRecoilState(myFlListsState);
  const [selectedLedger, setSelectedLedger] = useRecoilState(selectedLedgerState);
  const [myManageFlLists, setMyManageFlLists] = useRecoilState(myManageFlListsState);
  const [startIndex, setStartIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedTap, setSelectedTap] = useState("profile");
  const [newUserName, setNewUserName] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [chkNewPwd, setChkNewPwd] = useState("");
  const [file, setFile] = useState<File | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [token]);

  useEffect(() => {
    if (myFlLists.length > 0) {
      setSelectedLedger(myFlLists[0]);
    }
  }, [myFlLists]);

  return (
    <div style={{ overflow: "hidden" }}>
      <Wrapper>
        <Circle />
        <SecondCircle />
        <ThirdCircle />
        <Container>
          <NavBar 
            logo={logo} 
            navigate={navigate} 
            setShowModal={setShowModal} 
            setModalType={setModalType} 
            userInfo={userInfo}
            startIndex={startIndex} 
            setStartIndex={setStartIndex}
          />
          <OutletContainer>
            <Outlet />
          </OutletContainer>
          <Modal
            showModal={showModal} 
            setShowModal={setShowModal} 
            modalType={modalType} 
            selectedTap={selectedTap} 
            setSelectedTap={setSelectedTap} 
            newUserName={newUserName} 
            setNewUserName={setNewUserName} 
            newPwd={newPwd} 
            setNewPwd={setNewPwd} 
            chkNewPwd={chkNewPwd} 
            setChkNewPwd={setChkNewPwd} 
            file={file} 
            handleFileChange={handleFileChange}
            getUserInfo={getUserInfo}
          />
        </Container>
      </Wrapper>
    </div>
  );
};

export default Home;
