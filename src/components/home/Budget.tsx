import styled from "styled-components";
import Chart from "react-apexcharts";
import BudgetChart from "./budget/BudgetChart";

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
  align-items: center;
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

const Budget = () => {
  const currentMonthSpending = 450000; // This is the spending
  const currentMonthBudget = 1000000; // This is the budget
  const lastMonthSpending = 1240000; // This is the spending
  const lastMonthBudget = 1000000; // This is the budget
  const remainingBudget = currentMonthBudget - currentMonthSpending;
  return (
    <Wrapper>
      <Item1>
        <div>
          <Title>이번 달 지출</Title>
          <Price isIncome={false}>
            450,000<span>원</span>
          </Price>
        </div>
      </Item1>
      <Item2>
        <div>
          <Title>예산</Title>
          <Price isIncome={true}>
            1,000,000<span>원</span>
          </Price>
        </div>
      </Item2>
      <Item3>
        <BudgetChart
          data={currentMonthSpending}
          budget={currentMonthBudget}
          title="이번 달 예산"
          subtitle={`${currentMonthBudget.toLocaleString()} 원`}
        />
      </Item3>
      <Item4>
        <BudgetChart
            data={lastMonthSpending} 
            budget={lastMonthBudget} 
            title="지난 달 예산" 
            subtitle={`${lastMonthBudget.toLocaleString()} 원`} 
        />
      </Item4>
    </Wrapper>
  );
};
export default Budget;
