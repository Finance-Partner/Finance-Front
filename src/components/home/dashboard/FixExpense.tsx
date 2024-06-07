import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { householderIdState } from "../../../atom";
import { formatNumberWithCommas } from "../../utils";

// Define the expected data type
interface FixedExpense {
  content: string;
  amount: number;
  date: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 13px;
  font-weight: bold;
`;

const Income = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: #7763f4;
  span {
    font-size: 18px;
    color: #7763f4;
  }
`;

const EditButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
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

const FixedExpenseList = styled.div`
  margin-bottom: 20px;
`;

const FixedExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AddExpenseForm = styled.form`
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

const FixExpense = () => {
  const [fixedExpense, setFixedExpense] = useState(0);
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpense[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDate, setNewDate] = useState("");
  const flId = useRecoilValue(householderIdState);

  useEffect(() => {
    const fetchFixedExpense = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://43.201.7.157:8080/fl/info?flId=${flId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const expenseData = response.data.fixedInfo2;
        const totalExpense = expenseData
          .filter((item: any) => !item.isIncome)
          .reduce((acc: number, item: any) => acc + item.amount, 0);

        setFixedExpense(totalExpense);
        setFixedExpenses(expenseData.filter((item: any) => !item.isIncome));
      } catch (error) {
        console.error("Error fetching fixed expense:", error);
      }
    };

    fetchFixedExpense();
  }, [flId]);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://43.201.7.157:8080/fl/fixed`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            flId: flId,
            content: newContent,
            amount: newAmount,
            date: newDate,
            isIncome: false,
          },
        }
      );

      setFixedExpenses([
        ...fixedExpenses,
        {
          content: newContent,
          amount: Number(newAmount),
          date: Number(newDate),
        },
      ]);

      const totalExpense =
        fixedExpenses.reduce(
          (acc: number, item: FixedExpense) => acc + item.amount,
          0
        ) + Number(newAmount);

      setFixedExpense(totalExpense);
      setNewContent("");
      setNewAmount("");
      setNewDate("");
    } catch (error) {
      console.error("Error adding fixed expense:", error);
    }
  };

  return (
    <Wrapper>
      <div>
        <Title>월 고정 지출</Title>
        <Income>
          {formatNumberWithCommas(fixedExpense)}
          <span>KR</span>
        </Income>
        <EditButton onClick={() => setShowModal(true)}>수정</EditButton>
      </div>
      <ModalOverlay show={showModal}>
        <ModalContent>
          <ModalTitle>월 고정 지출 수정</ModalTitle>
          <FixedExpenseList>
            {fixedExpenses.map((item, index) => (
              <FixedExpenseItem key={index}>
                <span>{item.content}</span>
                <span>{formatNumberWithCommas(item.amount)}원</span>
                <span>{item.date}일</span>
              </FixedExpenseItem>
            ))}
          </FixedExpenseList>
          <AddExpenseForm onSubmit={handleAddExpense}>
            <Input
              type="text"
              placeholder="내용"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="금액"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="날짜"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              required
            />
            <AddButton type="submit">추가</AddButton>
          </AddExpenseForm>
          <EditButton onClick={() => setShowModal(false)}>닫기</EditButton>
        </ModalContent>
      </ModalOverlay>
    </Wrapper>
  );
};

export default FixExpense;
