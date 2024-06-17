import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactCalendar from "./ReactCalendar";
import SubmitForm from "./SubmitForm";
import { formatNumberWithCommas } from "../../utils";
import { useRecoilValue } from "recoil";
import { householderIdState, selectedLedgerState } from "../../../atom";
import {Transaction, Transactions} from "./types";
import FixedDetails from "./FixedDetail";



const processTransactions = (transactions: Transaction[]): Transactions => {
  const processed: Transactions = {};

  transactions.forEach(({date, amount, isIncome}) => {
    if(!processed[date]) {
      processed[date] = {income:0, expense:0};
    }
    if (isIncome === 'INCOME') {
      processed[date].income += amount;
    } else {
      processed[date].expense += amount;
    }
  });

  return processed;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 3fr;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const GridItem = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const Item1 = styled(GridItem)`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;
const Item2 = styled(GridItem)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;
const Item3 = styled(GridItem)`
  grid-column: 3 / 4;
  grid-row: 1 / 2;
`;
const Item4 = styled(GridItem)`
  grid-column: 1 / 3;
  grid-row: 2 / 3;
`;

const Item5 = styled(GridItem)`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
`;
const Title = styled.h2`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Price = styled.p<{ isIncome: boolean }>`
  font-size: 45px;
  font-weight: bold;
  color: ${(props) => (props.isIncome ? "#1ED8AB" : "#7763F4")};
  span {
    font-size: 20px;
  }
`;

const Overview = () => {
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);
  const [currentMonthSpending, setCurrentMonthSpending] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const flId = useRecoilValue(selectedLedgerState);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Get current year and month
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based

    // Fetch current month transactions
    axios
      .get(`http://43.201.7.157:8080/history/${flId.id}/${currentYear}/${currentMonth}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const income = response.data
          .filter((item: any) => item.isIncome === "INCOME")
          .reduce((acc: number, item: any) => acc + item.amount, 0);

        const spending = response.data
          .filter((item: any) => item.isIncome === "EXPENDITURE")
          .reduce((acc: number, item: any) => acc + item.amount, 0);

        setCurrentMonthIncome(income);
        setCurrentMonthSpending(spending);
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [flId, transactions]);

  const currentMonthBalance = currentMonthIncome - currentMonthSpending;
  const processedTransactions = processTransactions(transactions);

  return (
    <>
      <Wrapper>
        <Item1>
          <div>
            <Title>이번 달 수입</Title>
            <Price isIncome={true}>
              {formatNumberWithCommas(currentMonthIncome)}
              <span>원</span>
            </Price>
          </div>
        </Item1>
        <Item2>
          <div>
            <Title>이번 달 지출</Title>
            <Price isIncome={false}>
              {formatNumberWithCommas(currentMonthSpending)}
              <span>원</span>
            </Price>
          </div>
        </Item2>
        <Item3>
          <div>
            <Title>이번 달 정산</Title>
            <Price isIncome={currentMonthBalance >= 0}>
              {currentMonthBalance >= 0 ? "+" : ""}
              {formatNumberWithCommas(currentMonthBalance)}
              <span>원</span>
            </Price>
          </div>
        </Item3>
        <Item4>
          <ReactCalendar transactions={processedTransactions} />
        </Item4>
        <Item5>
          <FixedDetails/>
          {/* <SubmitForm /> */}
        </Item5>
      </Wrapper>
    </>
  );
};

export default Overview;
