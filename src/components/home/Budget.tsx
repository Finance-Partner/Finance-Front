import styled from "styled-components";
import Chart from "react-apexcharts";
import BudgetChart from "./budget/BudgetChart";
import { formatNumberWithCommas } from "../utils";

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
  padding-top:15%;
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
    color:#ABAAAA;
    padding-left: 25px;
    font-weight: bold;
    font-size:15px;
  }
  h4 {
    padding-left: 25px;
    margin-top: 20px;
    font-weight: bold;
    font-size:15px;
  }
  h5{
    margin-bottom:5px;
    padding-left: 25px;
    font-size:15px;
    color:#ABAAAA;
    font-weight:bold;
  }
  h6{
    margin-bottom:15px;
    padding-left: 25px;
    font-size:20px;
    font-weight:bold;
  }
`;

const Budget = () => {
  const currentMonthSpending = 450000; // This is the spending
  const currentMonthBudget = 1000000; // This is the budget
  const lastMonthSpending = 1240000; // This is the spending
  const lastMonthBudget = 1000000; // This is the budget
  const remainingBudget = currentMonthBudget - currentMonthSpending;
  const overBudget = lastMonthSpending - lastMonthBudget;
  return (
    <Wrapper>
      <Item1>
        <div>
          <Title>이번 달 지출</Title>
          <Price isIncome={false}>
            {formatNumberWithCommas(450000)}<span>원</span>
          </Price>
        </div>
      </Item1>
      <Item2>
        <div>
          <Title>예산</Title>
          <Price isIncome={true}>
          {formatNumberWithCommas(1000000)}<span>원</span>
          </Price>
        </div>
      </Item2>
      <Item3>
        <BottomContainer>
          <h3>이번 달 예산</h3>
          <h4>{formatNumberWithCommas(remainingBudget)}원 남았습니다</h4>
          <BudgetChart
            data={currentMonthSpending}
            budget={currentMonthBudget}
            title="이번 달 예산"
            subtitle={`${currentMonthBudget.toLocaleString()} 원`}
            color="#1ED8AB"
          />
          <h5>이번 달 예산</h5>
          <h6>{formatNumberWithCommas(currentMonthBudget)} 원</h6>
          <h5>이번 달 지출</h5>
          <h6>{formatNumberWithCommas(currentMonthSpending)} 원</h6>
        </BottomContainer>
      </Item3>
      <Item4>
        <BottomContainer>
          <h3>저번 달 예산 결과</h3>
          <h4>{formatNumberWithCommas(remainingBudget)}원 초과했습니다</h4>
          <BudgetChart
            data={lastMonthSpending}
            budget={lastMonthBudget}
            title="지난 달 예산"
            subtitle={`${lastMonthBudget.toLocaleString()} 원`}
            color="#7763F4"
          />
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
