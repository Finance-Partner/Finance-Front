// FixedDetails.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { selectedLedgerState } from "../../../atom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 35px;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: white;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FixedList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  max-height: 250px;
  margin-bottom: 20px;

  /* Hide scrollbar for Webkit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const FixedItem = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 15px;
`;

const DateBadge = styled.div<{ isIncome: boolean }>`
  width: 70px;
  height: 40px;
  border-radius: 10px;
  background-color: ${(props) => (props.isIncome ? "#1ED8AB" : "#7763F4")};
  padding-left: 5px;
  padding-right: 5px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  margin-right: 15px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ContentAmount = styled.div<{ isIncome: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.isIncome ? "#6c757d" : "#6c757d")};
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background-color: #7763f4;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: auto; /* Push the button to the bottom */
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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-height: 80%;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  display: block;
`;

const Select = styled.select`
  width: 25%;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  border: 1px none #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
`;

const FormRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const ToggleButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  width: 48%;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ active }) => (active ? "white" : "#7763f4")};
  background-color: ${({ active }) => (active ? "#7763f4" : "white")};
  border: 1px solid #7763f4;
  border-radius: 5px;
  cursor: pointer;
`;

const ModalButton = styled.button`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background-color: #7763f4;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

interface FixedInfo {
  fixId: number;
  content: string;
  amount: number;
  date: number;
  isIncome: boolean;
}

const FixedDetails: React.FC = () => {
  const [fixedInfo, setFixedInfo] = useState<FixedInfo[]>([]);
  const selectedLedger = useRecoilValue(selectedLedgerState);
  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDate, setNewDate] = useState("");
  const [isIncome, setIsIncome] = useState(false);

  const handleOverlayClick = () => {
    setShowModal(false);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const fetchFixedInfo = async () => {
      try {
        const response = await axios.get(
          `http://43.201.7.157:8080/fl/info?flId=${selectedLedger.id}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const sortedData = response.data.fixedInfo2.sort(
          (a: FixedInfo, b: FixedInfo) => a.date - b.date
        );
        setFixedInfo(sortedData);
      } catch (error) {
        console.error("Error fetching fixed info:", error);
      }
    };

    fetchFixedInfo();
  }, [selectedLedger, token]);

  const handleAddFixedInfo = async () => {
    try {
      await axios.post(
        `http://43.201.7.157:8080/fl/fixed?flId=${selectedLedger.id}&content=${newContent}&amount=${newAmount}&date=${newDate}&isIncome=${isIncome}`,
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowModal(false);
      setNewContent("");
      setNewAmount("");
      setNewDate("");
      setIsIncome(false);
      // Fetch the updated list after adding new fixed info
      const response = await axios.get(
        `http://43.201.7.157:8080/fl/info?flId=${selectedLedger.id}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sortedData = response.data.fixedInfo2.sort(
        (a: FixedInfo, b: FixedInfo) => a.date - b.date
      );
      setFixedInfo(sortedData);
    } catch (error) {
      console.error("Error adding fixed info:", error);
    }
  };

  return (
    <>
      <Wrapper>
        <Title>고정 지출 / 수입</Title>
        <FixedList>
          {fixedInfo.map((info) => (
            <FixedItem key={info.fixId}>
              <DateBadge isIncome={info.isIncome}>{info.date}일</DateBadge>
              <ContentWrapper>
                <ContentTitle>{info.content}</ContentTitle>
                <ContentAmount isIncome={info.isIncome}>
                  {info.amount.toLocaleString()} 원 /{" "}
                  {info.isIncome ? "수입" : "지출"}
                </ContentAmount>
              </ContentWrapper>
            </FixedItem>
          ))}
        </FixedList>
        <Button onClick={() => setShowModal(true)}>고정 내역 수정하기</Button>
      </Wrapper>
      <ModalOverlay show={showModal} onClick={handleOverlayClick}>
        <ModalContent onClick={handleContentClick}>
          <FormRow>
            <Label>매월</Label>
            <Select
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            >
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}일
                </option>
              ))}
            </Select>
          </FormRow>
          <Input
            type="number"
            placeholder="금액"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
          <ToggleButtonGroup>
            <ToggleButton active={!isIncome} onClick={() => setIsIncome(false)}>
              지출
            </ToggleButton>
            <ToggleButton active={isIncome} onClick={() => setIsIncome(true)}>
              수입
            </ToggleButton>
          </ToggleButtonGroup>
          <Input
            type="text"
            placeholder="메모"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <ModalButton onClick={handleAddFixedInfo}>추가</ModalButton>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default FixedDetails;
