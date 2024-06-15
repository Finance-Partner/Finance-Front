import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { householderIdState, selectedLedgerIdState } from "../../../atom";
import { formatNumberWithCommas } from "../../utils";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  margin-top: 20px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;
const Container = styled.div`
  padding-top: 10px;
  padding-left: 15px;
`;
const CategoryImg = styled.img`
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 50%;
  margin-top: 5px;
`;
const Price = styled.p<{ isIncome: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.isIncome ? "#1ED8AB" : "#7763F4")};
  font-weight: bold;
  margin-bottom: 3px;
`;
const Description = styled.p`
  font-size: 14px;
  color: #7b7f85;
  font-weight: bold;
`;
const DateContainer = styled.div`
  margin-bottom: 10px;
`;
const Date = styled.p`
  font-weight: bold;
  font-size: 15px;
  color: #7b7f85;
`;

interface Transaction {
  date: string;
  amount: number;
  content: string;
  category: string;
  isIncome: string;
}

const DashHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const flId = useRecoilValue(selectedLedgerIdState);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get<Transaction[]>(
          `http://43.201.7.157:8080/history/${flId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const sortedData = response.data.sort(
          (a: Transaction, b: Transaction) =>
            global.Date.parse(b.date) - global.Date.parse(a.date)
        );
        setTransactions(sortedData.slice(0, 4));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [flId]);

  return (
    <Wrapper>
      <Title>내역</Title>
      <Container>
        {transactions.map((transaction, index) => (
          <DateContainer key={index}>
            <Date>{transaction.date}</Date>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <CategoryImg />
              <div style={{ marginLeft: "10px" }}>
                <Price isIncome={transaction.isIncome === "INCOME"}>
                  {transaction.isIncome === "INCOME" ? "+" : "-"}
                  {formatNumberWithCommas(transaction.amount)}원
                </Price>
                <Description>{transaction.content}</Description>
              </div>
            </div>
          </DateContainer>
        ))}
      </Container>
    </Wrapper>
  );
};

export default DashHistory;
