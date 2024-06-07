import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BudgetChart from "./budget/BudgetChart";
import { formatNumberWithCommas } from "../utils";
import { useRecoilValue } from "recoil";
import { householderIdState } from "../../atom";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 3fr;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const GridItem1 = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 30px;
  border-radius: 20px;
`;

const GridItem2 = styled.div`
  background-color: white;
  display: flex;
  align-items: top;
  padding-top: 15%;
  justify-content: center;
  border-radius: 20px;
`;

const Item1 = styled(GridItem1)`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;

const Item2 = styled(GridItem1)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;

const Item3 = styled(GridItem2)`
  grid-column: 1 / 2;
  grid-row: 2 / 5;
`;

const Item4 = styled(GridItem2)`
  grid-column: 2 / 3;
  grid-row: 2 / 5;
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

const BottomContainer = styled.div`
  width: 100%;
  h3 {
    color: #ababab;
    padding-left: 25px;
    font-weight: bold;
    font-size: 15px;
  }
  h4 {
    padding-left: 25px;
    margin-top: 20px;
    font-weight: bold;
    font-size: 15px;
  }
  h5 {
    margin-bottom: 5px;
    padding-left: 25px;
    font-size: 15px;
    color: #ababab;
    font-weight: bold;
  }
  h6 {
    margin-bottom: 15px;
    padding-left: 25px;
    font-size: 20px;
    font-weight: bold;
  }
`;

const StatusText = styled.h4<{ isOverBudget: boolean }>`
  padding-left: 25px;
  margin-top: 20px;
  font-weight: bold;
  font-size: 15px;
  color: ${(props) => (props.isOverBudget ? "#7763F4" : "#1ED8AB")};
`;

const Budget = () => {
  const [currentMonthSpending, setCurrentMonthSpending] = useState(0);
  const [currentMonthBudget, setCurrentMonthBudget] = useState(0);
  const [lastMonthSpending, setLastMonthSpending] = useState(0);
  const [lastMonthBudget, setLastMonthBudget] = useState(0);
  const flId = useRecoilValue(householderIdState);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Get current year and month
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based

    // Calculate last month
    const lastMonthDate = new Date(
      currentDate.setMonth(currentDate.getMonth() - 1)
    );
    const lastMonthYear = lastMonthDate.getFullYear();
    const lastMonth = lastMonthDate.getMonth() + 1;

    // Fetch current month budget
    axios
      .get(`http://43.201.7.157:8080/fl/info`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          flId: flId,
        },
      })
      .then((response) => {
        setCurrentMonthBudget(response.data.budget);
      })
      .catch((error) => {
        console.error("Error fetching budget:", error);
      });

    // Fetch current month spending
    axios
      .get(
        `http://43.201.7.157:8080/history/${flId}/${currentYear}/${currentMonth}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const expenditures = response.data.filter(
          (item: any) => item.isIncome === "EXPENDITURE"
        );
        const totalSpending = expenditures.reduce(
          (acc: number, item: any) => acc + item.amount,
          0
        );
        setCurrentMonthSpending(totalSpending);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Fetch last month budget
    axios
      .get(`http://43.201.7.157:8080/fl/info`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          flId: flId,
        },
      })
      .then((response) => {
        setLastMonthBudget(response.data.budget);
      })
      .catch((error) => {
        console.error("Error fetching budget:", error);
      });

    // Fetch last month spending
    axios
      .get(
        `http://43.201.7.157:8080/history/${flId}/${lastMonthYear}/${lastMonth}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const expenditures = response.data.filter(
          (item: any) => item.isIncome === "EXPENDITURE"
        );
        const totalSpending = expenditures.reduce(
          (acc: number, item: any) => acc + item.amount,
          0
        );
        setLastMonthSpending(totalSpending);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [flId]);

  const remainingBudget = currentMonthBudget - currentMonthSpending;
  const overBudget = lastMonthSpending - lastMonthBudget;

  return (
    <Wrapper>
      <Item1>
        <div>
          <Title>이번 달 지출</Title>
          <Price isIncome={false}>
            {formatNumberWithCommas(currentMonthSpending)}
            <span>원</span>
          </Price>
        </div>
      </Item1>
      <Item2>
        <div>
          <Title>예산</Title>
          <Price isIncome={true}>
            {formatNumberWithCommas(currentMonthBudget)}
            <span>원</span>
          </Price>
        </div>
      </Item2>
      <Item3>
        <BottomContainer>
          <h3>이번 달 예산</h3>
          <StatusText isOverBudget={remainingBudget < 0}>
            {formatNumberWithCommas(Math.abs(remainingBudget))}원{" "}
            {remainingBudget < 0 ? "초과했습니다" : "남았습니다"}
          </StatusText>
          <BudgetChart
            data={currentMonthSpending}
            budget={currentMonthBudget}
            title="이번 달 예산"
            subtitle={`${currentMonthBudget.toLocaleString()} 원`}
            color={remainingBudget < 0 ? "#7763F4" : "#1ED8AB"}
          />
          <p
            style={{
              width: "100%",
              textAlign: "right",
              position: "relative",
              bottom: "30px",
              right: "30px",
              fontWeight: "bold",
            }}
          >
            {formatNumberWithCommas(currentMonthBudget)}
          </p>
          <h5>이번 달 예산</h5>
          <h6>{formatNumberWithCommas(currentMonthBudget)} 원</h6>
          <h5>이번 달 지출</h5>
          <h6>{formatNumberWithCommas(currentMonthSpending)} 원</h6>
        </BottomContainer>
      </Item3>
      <Item4>
        <BottomContainer>
          <h3>저번 달 예산 결과</h3>
          <StatusText isOverBudget={overBudget > 0}>
            {overBudget > 0
              ? `${formatNumberWithCommas(overBudget)}원 초과했습니다`
              : `${formatNumberWithCommas(Math.abs(overBudget))}원 남았습니다`}
          </StatusText>
          <BudgetChart
            data={lastMonthSpending}
            budget={lastMonthBudget}
            title="지난 달 예산"
            subtitle={`${lastMonthBudget.toLocaleString()} 원`}
            color={remainingBudget < 0 ? "#7763F4" : "#1ED8AB"}
          />
          <p
            style={{
              width: "100%",
              textAlign: "right",
              position: "relative",
              bottom: "30px",
              right: "30px",
              fontWeight: "bold",
            }}
          >
            {formatNumberWithCommas(currentMonthBudget)}
          </p>
          <h5>지난 달 예산</h5>
          <h6>{formatNumberWithCommas(lastMonthBudget)} 원</h6>
          <h5>지난 달 지출</h5>
          <h6>{formatNumberWithCommas(lastMonthSpending)} 원</h6>
        </BottomContainer>
      </Item4>
    </Wrapper>
  );
};

export default Budget;
