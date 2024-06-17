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
  margin-bottom: 20px;
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
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-height: 80%;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  & > * {
    width: 48%;
  }
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
      <ModalOverlay show={showModal}>
        <ModalContent>
          <ModalTitle>고정 지출 / 수입 추가</ModalTitle>
          <Input
            type="text"
            placeholder="내용"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <FormRow>
            <Input
              type="number"
              placeholder="금액"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
            />
            <Input
              type="number"
              placeholder="날짜"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </FormRow>
          <FormRow>
            <Select
              value={isIncome.toString()}
              onChange={(e) => setIsIncome(e.target.value === "true")}
            >
              <option value="false">지출</option>
              <option value="true">수입</option>
            </Select>
          </FormRow>
          <ModalButton onClick={handleAddFixedInfo}>추가</ModalButton>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default FixedDetails;
