import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { selectedLedgerState } from "../../../atom";
import WordCloud from "react-wordcloud";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const Title = styled.h1`
  padding-top: 15px;
  font-size: 20px;
  font-weight: bold;
`;
const WordCloudContainer = styled.div`
  width: 100%;
  height: 125px;
`;

interface Transaction {
  id: number;
  date: string;
  amount: number;
  content: string;
  category: string;
  isIncome: string;
}

const Ranking = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const token = localStorage.getItem("token");
  const flId = useRecoilValue(selectedLedgerState);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (flId && flId.id && token) {
        try {
          const response = await axios.get(
            `http://43.201.7.157:8080/history/${flId.id}`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTransactions(response.data);
        } catch (error) {
          console.error("Error fetching the transactions", error);
        }
      }
    };

    fetchTransactions();
  }, [flId, token]);

  const words = transactions.reduce((acc, transaction) => {
    const existingWord = acc.find((word) => word.text === transaction.content);
    if (existingWord) {
      existingWord.value += transaction.amount;
    } else {
      acc.push({ text: transaction.content, value: transaction.amount });
    }
    return acc;
  }, [] as { text: string; value: number }[]);

  const options = {
    rotations: 2,
    rotationAngles: [-90, 0] as [number, number],
    fontSizes: [10, 60] as [number, number],
  };

  return (
    <Wrapper>
      <div style={{ textAlign: "center" }}>
        <Title>최근 거래 내역 워드 클라우드</Title>
      </div>
      <WordCloudContainer>
        <WordCloud words={words} options={options} />
      </WordCloudContainer>
    </Wrapper>
  );
};

export default Ranking;
